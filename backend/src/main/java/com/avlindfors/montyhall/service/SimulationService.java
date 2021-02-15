package com.avlindfors.montyhall.service;

import static com.avlindfors.montyhall.domain.api.Strategy.STICK;

import com.avlindfors.montyhall.domain.api.SimulationRequest;
import com.avlindfors.montyhall.domain.api.SimulationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SimulationService {

  private final GameManagerService gameManagerService;

  @Autowired
  public SimulationService(GameManagerService gameManagerService) {
    this.gameManagerService = gameManagerService;
  }

  /**
   * Simulates given number of rounds och counts results.
   */
  public SimulationResponse simulate(SimulationRequest request) {
    var numberOfSimulations = request.getNumberOfSimulations();
    var strategy = request.getStickOrSwapStrategy();

    int totalWins = 0;
    for (int i = 0; i < numberOfSimulations; i++) {
      // Start a new abstraction of a game round
      // Randomly position the car between 3 possible positions
      int carDoor =  gameManagerService.getRandomDoorIndex();
      // Randomly pick a door between 3 possible positions
      int pickedDoor = gameManagerService.getRandomDoorIndex();
      // At this point in the game we know if we are going to be correct or not
      if (strategy.equals(STICK)) {
        if (carDoor == pickedDoor) {
          totalWins++;
        }
      } else {
        if(carDoor != pickedDoor) {
          totalWins++;
        }
      }
    }

    return SimulationResponse.newBuilder()
        .withTotalSimulations(numberOfSimulations)
        .withTotalWins(totalWins)
        .build();
  }
}
