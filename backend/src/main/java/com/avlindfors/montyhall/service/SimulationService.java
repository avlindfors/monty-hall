package com.avlindfors.montyhall.service;

import static com.avlindfors.montyhall.domain.api.Strategy.STICK;
import static com.avlindfors.montyhall.domain.game.Result.WIN;

import com.avlindfors.montyhall.domain.api.SimulationRequest;
import com.avlindfors.montyhall.domain.api.SimulationResponse;
import com.avlindfors.montyhall.domain.game.Game;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
      // Start a new game
      Game game = new Game(strategy);
      gameManagerService.startGame(game);
      // Pick your door
      gameManagerService.pickADoor(game);
      // End early if strategy is to STICK
      if (strategy.equals(STICK)) {
        if (game.isCurrentPickCorrect()) {
          totalWins++;
        }
        continue;
      }
      // Reveal prize behind one door
      gameManagerService.openOneDoor(game);
      // Determine win condition
      gameManagerService.endGame(game);
      if (game.getGameResult().equals(WIN)) {
        totalWins++;
      }
    }

    return SimulationResponse.newBuilder()
        .withTotalSimulations(numberOfSimulations)
        .withTotalWins(totalWins)
        .build();
  }
}
