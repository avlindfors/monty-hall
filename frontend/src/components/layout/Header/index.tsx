import React, { useEffect, useState } from "react";
import classNames from "classnames";

import ServerStatusObject from "../../../api/ServerStatusObject";
import HttpMethod from "../../../enums/HttpMethod";
import ServerStatus from "../../../enums/ServerStatus";
import useAxios from "../../../hooks/useAxios";

function Header() {
  const [serverStatus, setServerStatus] = useState(ServerStatus.DOWN);

  const handleStatusChange = ({ status }: ServerStatusObject) => {
    setServerStatus(status);
  };

  const { performCall } = useAxios({
    url: "/actuator/health",
    method: HttpMethod.GET,
    overrideBaseUrl: true,
    onResponse: handleStatusChange,
    onError: () => handleStatusChange({ status: ServerStatus.DOWN }),
  });

  useEffect(() => {
    performCall();
    const intervalRef = setInterval(() => {
      performCall();
    }, 5000);

    return () => clearInterval(intervalRef);
  }, []);

  const serverIsUp = serverStatus === ServerStatus.UP;
  const serverStateClass = classNames("text-sm font-bold", {
    "text-green-400": serverIsUp,
    "text-red-400": !serverIsUp,
  });
  return (
    <header className="py-4 sm:py-10 mb-2 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="body-header">Monty Hall Simulator</h1>
      </div>
      <div>
        <p className={serverStateClass} data-testid="server-status">
          Server is{" "}
          <span className="text-current">{serverIsUp ? "UP" : "DOWN"}</span>
        </p>
      </div>
    </header>
  );
}

export default Header;
