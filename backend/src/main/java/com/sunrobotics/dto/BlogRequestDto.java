package com.sunrobotics.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BlogRequestDto {
    @NotBlank(message = "Title is required")
    private String title;

    private String excerpt;

    @NotBlank(message = "Content is required")
    private String content;

    private String category;
    private String author;
    private String imageUrl;
    private String readTime;
}
