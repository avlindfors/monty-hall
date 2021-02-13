import React, { createContext, useContext, useState } from "react";
import ServerStatusObject from "../api/ServerStatusObject";
import ServerStatus from "../enums/ServerStatus";

export interface DataContextInterface {
  updateServerStatus: (status: ServerStatusObject) => void;
  isServerUp: () => boolean;
}

export const DataContext: any = createContext(undefined);

/**
 * Wrap this around component root to have reactive access to app state.
 */
function DataProvider({ children }: any) {
  const [serverStatus, setServerStatus] = useState<ServerStatus>(
    ServerStatus.DOWN
  );

  function updateServerStatus(serverStatus: ServerStatusObject): void {
    //setServerStatus(serverStatus.status);
  }

  function isServerUp(): boolean {
    return serverStatus === ServerStatus.UP;
  }

  return (
    <DataContext.Provider
      value={{
        updateServerStatus,
        isServerUp,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData(): DataContextInterface {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within an DataProvider");
  }

  return context as DataContextInterface;
}

export { DataProvider, useData };
