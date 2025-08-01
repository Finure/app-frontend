#!/bin/bash

SERVICE_URL="http://app-middleware.ai.svc.cluster.local.:8080/healthz" 

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SERVICE_URL")

if [ "$HTTP_CODE" -eq 200 ]; then
  echo "Service is healthy"
  exit 0
else
  echo "Service check failed, returned $HTTP_CODE"
  exit 1
fi
