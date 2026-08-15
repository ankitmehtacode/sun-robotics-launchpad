package com.sunrobotics.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JobRequestDto {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Type is required")
    private String type;

    private String description;
    private String requirements;
    private boolean active = true;
}
