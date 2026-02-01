#include <WiFi.h>
#include <HTTPClient.h>
#include "time.h"


const char* ssid = "vivo Y73";    
const char* password = "12345678";      
const char* serverUrl = "http://10.124.144.99:5000/api/waste"; 

#define TRIG_PIN 5
#define ECHO_PIN 18
#define TRIGGER_DIST 15   



void sendUpdate(String eventType) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    
    String payload = "{\"deviceId\":\"BIN_01\",\"event\":\"" + eventType + "\",\"distanceCm\":10.0}";
    
    int code = http.POST(payload);
    Serial.printf("📡 Dashboard -> %s (HTTP %d)\n", eventType.c_str(), code);
    http.end();
  }
}

float getDistance() {
  digitalWrite(TRIG_PIN, LOW); delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(2);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 20000);
  return (duration == 0) ? 999 : (duration * 0.034 / 2);
}

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT); pinMode(ECHO_PIN, INPUT);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println("\n✅ READY: Show hand to sensor...");
}

/* ---------- LOOP ---------- */
void loop() {
  float dist = getDistance();

  // 🔴 1. CHECK FOR HAND
  if (dist < TRIGGER_DIST && dist > 1) {
    
    Serial.println("🟢 STEP 1: Hand Detected! Sending OPEN...");
    sendUpdate("OPEN");

    Serial.println("⏳ STEP 2: Waiting 2 seconds...");
    delay(2000); // 👈 Changed from 4s/5s to 2 SECONDS specifically

    Serial.println("🔴 STEP 3: Auto-Closing Dashboard...");
    sendUpdate("CLOSE");

    Serial.println("🔄 STEP 4: Resetting. Remove hand from sensor.");
    
    // 🟡 5. WAIT UNTIL HAND IS REMOVED (Prevents looping)
    while(getDistance() < (TRIGGER_DIST + 10)) {
      delay(100); 
    }
    
    Serial.println("✨ READY FOR NEXT TRIGGER");
  }

  delay(100); 
}