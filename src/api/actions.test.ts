import mqtt from "mqtt";
import {
  publishMelody,
  sendBuzzerCommand,
  subscribeToStatus,
} from "./actions";

jest.mock("mqtt", () => ({
  __esModule: true,
  default: {
    connect: jest.fn(),
  },
}));

describe("MQTT broker connection", () => {
  const brokerUrl = "wss://broker.hivemq.com:8884/mqtt";
  let handlers: Record<string, (...args: unknown[]) => void>;
  let mqttClient: {
    on: jest.Mock;
    end: jest.Mock;
    publish: jest.Mock;
    subscribe: jest.Mock;
  };

  beforeEach(() => {
    handlers = {};
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    mqttClient = {
      on: jest.fn((event: string, handler: (...args: unknown[]) => void) => {
        handlers[event] = handler;
      }),
      end: jest.fn(),
      publish: jest.fn(),
      subscribe: jest.fn(),
    };
    jest.mocked(mqtt.connect).mockReturnValue(mqttClient as never);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    ["publishes a melody", () => publishMelody("melody", "device-1")],
    ["subscribes to status", () => subscribeToStatus("device-1", jest.fn())],
    ["sends a buzzer command", () => sendBuzzerCommand("device-1", "PAUSE")],
  ])("%s through the configured broker", async (_description, connect) => {
    await connect();

    expect(mqtt.connect).toHaveBeenCalledWith(brokerUrl);
    expect(mqttClient.on).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(mqttClient.on).toHaveBeenCalledWith("error", expect.any(Function));
  });

  it("closes the publishing client when the broker reports an error", async () => {
    await publishMelody("melody", "device-1");

    handlers.error(new Error("broker unavailable"));

    expect(mqttClient.end).toHaveBeenCalledTimes(1);
  });

  it("closes the command client when the broker reports an error", () => {
    sendBuzzerCommand("device-1", "TOGGLE");

    handlers.error(new Error("broker unavailable"));

    expect(mqttClient.end).toHaveBeenCalledTimes(1);
  });
});