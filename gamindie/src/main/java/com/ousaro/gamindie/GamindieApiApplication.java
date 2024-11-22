package com.ousaro.gamindie;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import com.ousaro.gamindie.role.Role;
import com.ousaro.gamindie.role.RoleRepository;

@SpringBootApplication
@EnableJpaAuditing // adding this annotation to enable JPA Auditing in the application
@EnableAspectJAutoProxy // adding this annotation to enable AspectJ support in the application
@EnableAsync // adding this annotation to enable Spring’s ability to run @Async methods in a background thread pool
public class GamindieApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamindieApiApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(RoleRepository roleRepository) {
		return args -> {

			if(roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(
					Role.builder().name("USER").build()
				);
			}

		};
	}

}
