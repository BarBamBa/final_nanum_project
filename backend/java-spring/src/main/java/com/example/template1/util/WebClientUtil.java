package com.example.template1.util;

import com.example.template1.config.WebClientConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class WebClientUtil {
    private final WebClientConfig webClientConfig;

    public <T> T get(String url, Class<T> responseDto) {
        return webClientConfig.webClient().method(HttpMethod.GET)
                .uri(url)
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError()
                 , clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(RuntimeException::new))
                .bodyToMono(responseDto)
                .block();
    }

    public <T, V> T post(String url, V requestDto, Class<T> responseDtoClass) {
        return webClientConfig.webClient().method(HttpMethod.POST)
                .uri(url)
                .bodyValue(requestDto)
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError()
                        , clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(RuntimeException::new))
                .bodyToMono(responseDtoClass)
                .block();
    }
}
