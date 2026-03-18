"use client";

class Storage {
  static getDeviceId(): string | null {
    return localStorage.getItem("deviceId");
  }
  static setDeviceId(deviceId: string): void {
    localStorage.setItem("deviceId", deviceId);
  }
}

export default Storage;
