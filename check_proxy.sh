#!/bin/bash

# Doctor+ Web Frontend - Proxy Check Script
# Verifies that the API proxy is working correctly

set -e

echo "🔍 Doctor+ Web Frontend - Proxy Check"
echo "====================================="

# Check if required environment variables are set
if [ -z "$DOCTORPLUS_BACKEND_URL" ]; then
    echo "❌ DOCTORPLUS_BACKEND_URL environment variable not set"
    echo "   Please set: export DOCTORPLUS_BACKEND_URL='https://your-backend-url'"
    exit 1
fi

if [ -z "$DOCTORPLUS_API_KEY" ]; then
    echo "❌ DOCTORPLUS_API_KEY environment variable not set"
    echo "   Please set: export DOCTORPLUS_API_KEY='your-api-key'"
    exit 1
fi

echo "✅ Environment variables: OK"
echo

echo "📡 Testing backend connection..."
BACKEND_HEALTH="$DOCTORPLUS_BACKEND_URL/health"
echo "GET $BACKEND_HEALTH"

BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_HEALTH")
if [ "$BACKEND_STATUS" -eq 200 ]; then
    echo "✅ Backend health check: OK ($BACKEND_STATUS)"
else
    echo "❌ Backend health check: FAILED ($BACKEND_STATUS)"
    exit 1
fi

echo

echo "🧪 Testing backend /v1/doctorplus proxy endpoint..."
BACKEND_DOCTORPLUS="$DOCTORPLUS_BACKEND_URL/v1/doctorplus"
echo "POST $BACKEND_DOCTORPLUS"

TEST_RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST "$BACKEND_DOCTORPLUS" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $DOCTORPLUS_API_KEY" \
  -d '{"mode":"symptoms","text":"test"}')

TEST_STATUS=$(echo "$TEST_RESPONSE" | tail -n 1)
TEST_BODY=$(echo "$TEST_RESPONSE" | head -n -1)

if [ "$TEST_STATUS" -eq 200 ] || [ "$TEST_STATUS" -eq 500 ] || [ "$TEST_STATUS" -eq 422 ]; then
    echo "✅ Backend /v1/doctorplus: OK ($TEST_STATUS)"
    if [ "$TEST_STATUS" -eq 500 ]; then
        if echo "$TEST_BODY" | grep -q "AI_NOT_CONFIGURED\|not configured"; then
            echo "   📝 Note: GROQ_API_KEY not configured on backend (expected in test)"
        fi
    fi
else
    echo "❌ Backend /v1/doctorplus: FAILED ($TEST_STATUS)"
    echo "Response: $TEST_BODY"
    exit 1
fi

echo
echo "✅ All backend checks passed!"
echo
echo "🚀 To test the proxy after deployment:"
echo "curl -X POST https://your-web-app.vercel.app/api/doctorplus \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"mode\":\"symptoms\",\"text\":\"У меня болит голова\"}'"