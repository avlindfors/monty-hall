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

    boolean useStickStrategy = strategy.equals(STICK);
    int totalWins = 0;
    for (int i = 0; i < numberOfSimulations; i++) {
      // Randomly position the car between 3 possible positions
      int carDoor = gameManagerService.getRandomDoorIndex();
      // Randomly pick a door between 3 possible positions
      int pickedDoor = gameManagerService.getRandomDoorIndex();
      // At this point we know if this is a winning round or not
      if (useStickStrategy) {
        // If we stick we are always going to win if we have currently picked the correct door
        if (carDoor == pickedDoor) {
          totalWins++;
        }
      } else {
        // If we swap we are always going to win if we have not currently picked the correct door
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
