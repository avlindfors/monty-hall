package com.avlindfors.montyhall.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.avlindfors.montyhall.domain.api.SimulationRequest;
import com.avlindfors.montyhall.domain.api.SimulationResponse;
import com.avlindfors.montyhall.service.SimulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class SimulationController {

  private final SimulationService service;

  @Autowired
  public SimulationController(SimulationService service) {
    this.service = service;
  }

  /**
   * Simulates given rounds of the Monty Hall paradox with provided strategy.
   */
  @PostMapping(value = "/simulate",
      produces = APPLICATION_JSON_VALUE,
      consumes = APPLICATION_JSON_VALUE)
  public SimulationResponse simulate(@RequestBody @Validated SimulationRequest request) {
    return service.simulate(request);
  }
}
