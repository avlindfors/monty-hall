package com.avlindfors.montyhall.controller;

import static com.avlindfors.montyhall.domain.api.ErrorCode.PARAMETER_VALIDATION_ERROR;
import static com.avlindfors.montyhall.domain.api.Strategy.SWAP;
import static com.avlindfors.montyhall.util.SimulationTestUtil.createRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.avlindfors.montyhall.domain.api.ErrorObject;
import com.avlindfors.montyhall.domain.api.SimulationRequest;
import com.avlindfors.montyhall.domain.api.SimulationResponse;
import com.avlindfors.montyhall.domain.api.Strategy;
import com.avlindfors.montyhall.service.SimulationService;
import com.avlindfors.montyhall.util.SimulationTestUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@WebMvcTest(SimulationController.class)
public class SimulationControllerTest {

  private static final String URL = "/api/v1/simulate";

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private SimulationService simulationService;

  @Test
  public void canMakeValidCall() throws Exception {

    doReturn(SimulationResponse.newBuilder()
            .withTotalSimulations(1000)
            .withTotalWins(666)
            .build())
        .when(simulationService)
        .simulate(any());

    var request = createRequest(1000, SWAP);
    var response = makeCall(request);
    assertThat(response.getTotalSimulations()).isEqualTo(1000);
    assertThat(response.getTotalWins()).isEqualTo(666);
  }

  @Test
  public void numberOfSimulationsMustNotBeNull() throws Exception {
    var request = createRequest(null, SWAP);
    var response = makeInvalidCall(request);
    assertThat(response.getCode()).isEqualTo(PARAMETER_VALIDATION_ERROR);
    assertThat(response.getDescription()).isEqualTo("numberOfSimulations: must not be null");
  }

  @Test
  public void numberOfSimulationsMustBeGreaterThanZero() throws Exception {
    var request = createRequest(0, SWAP);
    var response = makeInvalidCall(request);
    assertThat(response.getCode()).isEqualTo(PARAMETER_VALIDATION_ERROR);
    assertThat(response.getDescription())
        .isEqualTo("numberOfSimulations: must be greater than or equal to 1");
  }

  @Test
  public void strategyMustNotBeNull() throws Exception {
    var request = createRequest(1000, null);
    var response = makeInvalidCall(request);
    assertThat(response.getCode()).isEqualTo(PARAMETER_VALIDATION_ERROR);
    assertThat(response.getDescription()).isEqualTo("stickOrSwapStrategy: must not be null");
  }

  private ErrorObject makeInvalidCall(SimulationRequest request) throws Exception {
    return performCall(request, HttpStatus.BAD_REQUEST, ErrorObject.class);
  }

  private SimulationResponse makeCall(SimulationRequest request)
      throws Exception {
    return performCall(request, HttpStatus.OK, SimulationResponse.class);
  }

  private <R> R performCall(SimulationRequest request, HttpStatus status, Class<R> returnType)
      throws Exception {
    MvcResult result = mockMvc.perform(post(URL)
        .content(objectMapper.writeValueAsString(request))
        .contentType(APPLICATION_JSON_VALUE))
        .andExpect(status().is(status.value()))
        .andDo(print())
        .andReturn();
    return objectMapper.readValue(result.getResponse().getContentAsString(), returnType);
  }
}
