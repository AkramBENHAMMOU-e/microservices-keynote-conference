package com.tp.conferenceservice.model;

import lombok.*;

import java.util.UUID;
@Getter @Setter
public class Keynote {
    private UUID id;
    private String name;
    private String prenom;
    private String email;
    private String fonction;

}
