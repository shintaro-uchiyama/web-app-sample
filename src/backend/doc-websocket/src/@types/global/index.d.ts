declare module "y-websocket/bin/utils" {
  export function setupWSConnection(conn: any, req: any, opts: any): void;
  export const setPersistence: (
    persistence_: {
      bindState: (arg0: string, arg1: WSSharedDoc) => void;
      writeState: (arg0: string, arg1: WSSharedDoc) => Promise<any>;
      provider: any;
    } | null
  ) => void;
}
