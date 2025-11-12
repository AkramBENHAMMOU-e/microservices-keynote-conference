package com.tp.keynoteserice;

import com.tp.keynoteserice.entities.Keynote;
import com.tp.keynoteserice.repository.KeynoteRepository;
import org.apache.hc.core5.reactor.Command;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class KeynoteSericeApplication {

	public static void main(String[] args) {
		SpringApplication.run(KeynoteSericeApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(KeynoteRepository keynoteRepository) {
		return args -> {
			if (keynoteRepository.count() == 0) {
				keynoteRepository.saveAll(List.of(
						Keynote.builder()
								.id(UUID.randomUUID())
								.name("ouss")
								.prenom("lolo")
								.email("kkk@gmail.com")
								.fonction("directeur")
								.build(),
						Keynote.builder()
								.id(UUID.randomUUID())
								.name("ach")
								.prenom("aa")
								.email("a@gmail.com")
								.fonction("comptable")
								.build(),
						Keynote.builder()
								.id(UUID.randomUUID())
								.name("ak")
								.prenom("akoo")
								.email("aa@gmail.com")
								.fonction("rh")
								.build()
				));
			}
		};
	}
}
