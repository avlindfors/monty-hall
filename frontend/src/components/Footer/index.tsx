import React, { useEffect, useState } from "react";
import classNames from "classnames";

import useAxios from "../../hooks/useAxios";
import HttpMethod from "../../enums/HttpMethod";
import ServerStatus from "../../enums/ServerStatus";
import ServerStatusObject from "../../api/ServerStatusObject";

function Footer() {
  const [serverStatus, setServerStatus] = useState(ServerStatus.DOWN);

  const handleStatusChange = ({ status }: ServerStatusObject) => {
    setServerStatus(status);
  };

  const { performCall } = useAxios({
    url: "/actuator/health",
    method: HttpMethod.GET,
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
  const serverStateClass = classNames({
    "text-lg": true,
    "text-green-500": serverIsUp,
    "text-red-500": !serverIsUp,
    uppercase: true,
  });
  return (
    <footer className="pt-4">
      <p>
        Built by Alexander Lindfors with React, Talwindcss &amp; Spring Boot and{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>
      </p>
      <p className={serverStateClass}>
        Server is <span>{serverIsUp ? "UP" : "DOWN"}</span>
      </p>
    </footer>
  );
}

export default Footer;
