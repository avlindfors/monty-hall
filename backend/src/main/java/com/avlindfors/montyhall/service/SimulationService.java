package com.avlindfors.montyhall.service;

import com.avlindfors.montyhall.domain.api.SimulationRequest;
import com.avlindfors.montyhall.domain.api.SimulationResponse;
import com.avlindfors.montyhall.domain.game.Door;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
public class SimulationService {

  private static final Logger log = LoggerFactory.getLogger(SimulationService.class);

  private final GameService gameService;

  public SimulationService(GameService gameService) {
    this.gameService = gameService;
  }

  /**
   * Simulerar angivet antal spelomgångar och räknar utfallen.
   */
  public SimulationResponse simulate(SimulationRequest request) {
    var numberOfSimulations = request.getNumberOfSimulations();
    var strategy = request.getStickOrSwapStrategy();

    int totalWins = 0;

    for (int i = 0; i < numberOfSimulations; i++) {
      Door[] doors = gameService.initGame();
      log.info("Doors are: {} with length: {}", (Object[]) doors, doors.length);
      int initialDoorPick = gameService.pickDoor(doors);
      log.info("initial pick is: {}", initialDoorPick);
      int openedDoor = gameService.openOneDoor(initialDoorPick, doors);
      log.info("opened door is: {}", openedDoor);
      boolean isSuccess = gameService.endGame(initialDoorPick, openedDoor, doors, strategy);
      log.info("Game: " + i + " was won: {}", isSuccess);
      if (isSuccess) {
        totalWins++;
      }
    }

    return SimulationResponse.newBuilder()
        .withTotalSimulations(request.getNumberOfSimulations())
        .withTotalWins(totalWins)
        .build();
  }

  private int getRandomCarStartionPosition() {
    return ThreadLocalRandom.current().nextInt(0, 3);
  }
}
