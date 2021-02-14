package com.avlindfors.montyhall.service;

import static com.avlindfors.montyhall.domain.game.Prize.CAR;
import static com.avlindfors.montyhall.domain.game.Prize.GOAT;
import static com.avlindfors.montyhall.domain.game.Result.LOSS;
import static com.avlindfors.montyhall.domain.game.Result.WIN;

import com.avlindfors.montyhall.domain.game.Game;
import com.avlindfors.montyhall.domain.game.Prize;
import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

@Component
public class GameManagerService {

  private static final int NUMBER_OF_DOORS = 3;
  // We can always know where the goats are
  // e.g. if the car is at i0 the goats are at i1 & i2
  private static final int[][] POSSIBLE_GOAT_POSITIONS = {{1,2}, {0,2}, {0,1}};

  /**
   * Creates a new game. Simulates that Monty Hall knew where all the prizes were.
   * @param game current game state which might be reset.
   * @return the initial game state.
   */
  public Game startGame(Game game) {

    // Create the doors with prizes
    Prize[] doors = new Prize[] {GOAT, GOAT, GOAT};
    int carPosition = getRandomDoorIndex();
    doors[carPosition] = CAR;
    // Determine goat positions
    int[] possibleGoatPositions = POSSIBLE_GOAT_POSITIONS[carPosition];

    // Prepare game state
    game.setDoors(doors);
    game.setCarPositionIndex(carPosition);
    game.setGoatPositionIndices(possibleGoatPositions);
    return game;
  }

  /**
   * Randomly pick a door and update game state.
   * @param game with current state.
   * @return updated game state
   */
  public Game pickADoor(Game game) {
    int pickedDoor = getRandomDoorIndex();
    game.setInitialPickIndex(pickedDoor);
    return game;
  }

  /**
   * Open one door to reveal a goat and update game state.
   * @param game with current state.
   * @return updated game state.
   */
  public Game openOneDoor(Game game) {
    var currentGoatPositons = game.getGoatPositionIndices();
    // Randomly choose one of the possible goat positions to "open"
    int randomDoorWithGoat = generateRandomInt(0, currentGoatPositons.length);
    int actualRandomDoorWithGoat = currentGoatPositons[randomDoorWithGoat];
    game.setOpenDoorIndex(actualRandomDoorWithGoat);
    return game;
  }

  /**
   * Determine game result and update game state.
   * @param game with current state.
   * @return updated game state.
   */
  public Game endGame(Game game) {
    game.setGameResult(LOSS);
    switch (game.getStrategy()) {
      case STICK:
        // If the strategy is to stick then we win if we have currently picked the car.
        if (game.isCurrentPickCorrect()) {
          game.setGameResult(WIN);
        }
        break;
      case SWAP:
        // If the strategy is to swap then we win if we have not currently picked the car.
        if (!game.isCurrentPickCorrect()) {
          game.setGameResult(WIN);
        }
        break;
      default:
        throw new IllegalStateException("Unsupported game strategy: " + game.getStrategy());
    }
    return game;
  }

  private int getRandomDoorIndex() {
    return generateRandomInt(0, NUMBER_OF_DOORS);
  }

  private int generateRandomInt(int start, int end) {
    return ThreadLocalRandom.current().nextInt(start, end);
  }
}
