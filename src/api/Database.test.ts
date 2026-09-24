import { instanceMelodiesDatabase } from "./Database";
import { RTTTLMelody } from "../configs/default_melodies";

describe("MelodiesDatabase API connection", () => {
  const melody: RTTTLMelody = {
    title: "Ukraine",
    code: "Ukraine:d=4,o=5,b=120:c,e,g",
  };

  const mockFetch = () => {
    const response = {
      ok: true,
      json: jest.fn().mockResolvedValue({ id: "melody-1", ...melody }),
    };

    global.fetch = jest.fn().mockResolvedValue(response);
    return response;
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("gets melodies from the configured API", async () => {
    const response = mockFetch();

    await expect(instanceMelodiesDatabase.getAllMelodies()).resolves.toEqual({
      id: "melody-1",
      ...melody,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://pg-melody-server-2.onrender.com/melodies",
      { method: "GET" },
    );
    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it("sends a new melody to the API", async () => {
    mockFetch();

    await instanceMelodiesDatabase.createMelody(melody);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://pg-melody-server-2.onrender.com/melodies",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(melody),
      },
    );
  });

  it("updates and deletes a melody using its id", async () => {
    const response = mockFetch();
    const melodyWithId = { ...melody, id: "melody-1" };

    await instanceMelodiesDatabase.updateMelody(melodyWithId);
    await instanceMelodiesDatabase.deleteMelody(melodyWithId.id);

    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      "https://pg-melody-server-2.onrender.com/melodies/melody-1",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(melodyWithId),
      },
    );
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      "https://pg-melody-server-2.onrender.com/melodies/melody-1",
      { method: "DELETE" },
    );
    expect(response.json).toHaveBeenCalledTimes(2);
  });

  it("reports an unavailable API response", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    await expect(instanceMelodiesDatabase.getAllMelodies()).rejects.toThrow(
      "current list is not access",
    );
  });
});