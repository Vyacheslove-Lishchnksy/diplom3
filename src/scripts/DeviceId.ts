import Storage from "../api/Storage";

class DeviceId {
  constructor(private deviceId: string | null) {
    if (deviceId) {
      Storage.setDeviceId(deviceId);
    }
  }

  private isDeviceIdExists(): boolean {
    const deviceId = Storage.getDeviceId();
    return this.isNotVoid(deviceId);
  }

  public getDeviceId(): string | null {
    if (!this.isDeviceIdExists()) {
      return null;
    }
    return Storage.getDeviceId();
  }

  public isNotVoid(id: string | null | undefined) {
    return id !== null && id !== undefined && id !== "";
  }
}

export const deviceIdInstance = new DeviceId(Storage.getDeviceId());
