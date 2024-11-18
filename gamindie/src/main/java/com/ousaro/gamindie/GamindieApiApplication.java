package com.ousaro.gamindie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy // adding this annotation to enable AspectJ support in the application
public class GamindieApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamindieApiApplication.class, args);
	}

}
