package com.ousaro.gamindie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAspectJAutoProxy // adding this annotation to enable AspectJ support in the application
@EnableAsync // adding this annotation to enable Spring’s ability to run @Async methods in a background thread pool
public class GamindieApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamindieApiApplication.class, args);
	}

}
