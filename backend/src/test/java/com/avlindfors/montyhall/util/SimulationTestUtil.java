package com.avlindfors.montyhall.util;

import com.avlindfors.montyhall.domain.api.SimulationRequest;
import com.avlindfors.montyhall.domain.api.Strategy;

public class SimulationTestUtil {

  public static SimulationRequest createRequest(Integer numberOfSimulations, Strategy strategy) {
    return SimulationRequest.newBuilder()
        .withNumberOfSimulations(numberOfSimulations)
        .withStickOrSwapStrategy(strategy)
        .build();
  }
}
