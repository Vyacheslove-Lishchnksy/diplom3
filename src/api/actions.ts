import mqtt from "mqtt";

const MQTT_CONFIG = {
  host: "broker.emqx.io",
  port: 8084,
  protocol: "wss",
  path: "/mqtt",
};

export interface DeviceStatus {
  state: "playing" | "paused" | "stopped" | "online" | "sleeping";
  melody: string | null;
}

export type BuzzerCommand = "PAUSE" | "RESUME" | "TOGGLE";

export const publishMelody = async (melodyString: string, deviceId: string) => {
  const client = mqtt.connect(
    `${MQTT_CONFIG.protocol}://${MQTT_CONFIG.host}:${MQTT_CONFIG.port}${MQTT_CONFIG.path}`,
  );

  client.on("connect", () => {
    client.publish(`${deviceId}/buzzer`, melodyString, { qos: 1 }, () => {
      client.end();
    });
  });

  client.on("error", (err: Error) => {
    console.error("Connection error: ", err);
    client.end();
  });
};

export const subscribeToStatus = (
  deviceId: string,
  onStatusUpdate: (status: DeviceStatus) => void,
) => {
  const client = mqtt.connect(
    `${MQTT_CONFIG.protocol}://${MQTT_CONFIG.host}:${MQTT_CONFIG.port}${MQTT_CONFIG.path}`,
  );
  const statusTopic = `${deviceId}/buzzer/status`;

  client.on("connect", () => {
    client.subscribe(statusTopic, (err) => {
      if (!err) {
        console.log(`[MQTT] Subscribed to status: ${statusTopic}`);
      }
    });
  });

  client.on("message", (topic, message) => {
    if (topic === statusTopic) {
      try {
        const status: DeviceStatus = JSON.parse(message.toString());

        console.log(status);
        onStatusUpdate(status);
      } catch (e) {
        console.error("[MQTT] Error parsing status message", e);
      }
    }
  });

  client.on("error", (err: Error) => {
    console.error("[MQTT] Subscription error: ", err);
  });

  return () => {
    console.log(`[MQTT] Unsubscribing from ${statusTopic}`);
    client.end();
  };
};

export const sendBuzzerCommand = (deviceId: string, payload: BuzzerCommand) => {
  console.log(
    `[MQTT] Фізична відправка повідомлення в ${deviceId}/buzzer:`,
    payload,
  );

  const client = mqtt.connect(
    `${MQTT_CONFIG.protocol}://${MQTT_CONFIG.host}:${MQTT_CONFIG.port}${MQTT_CONFIG.path}`,
  );

  const targetTopic = `${deviceId}/buzzer`;

  client.on("connect", () => {
    client.publish(targetTopic, payload, { qos: 1 }, () => {
      console.log("[MQTT] Пакет успішно доставлено брокеру");
      client.end();
    });
  });

  client.on("error", (err) => {
    console.error("[MQTT] Помилка при відправці повідомлення:", err);
    client.end();
  });
};
