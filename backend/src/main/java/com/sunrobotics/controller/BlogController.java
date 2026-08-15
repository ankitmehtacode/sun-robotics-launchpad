package com.sunrobotics.controller;

import com.sunrobotics.dto.BlogRequestDto;
import com.sunrobotics.model.Blog;
import com.sunrobotics.service.BlogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BlogController {

    @Autowired
    private BlogService blogService;

    // --- Public Endpoints ---

    @GetMapping("/api/blogs")
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/api/blogs/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- Admin Endpoints (Secured by /api/admin/** pattern) ---

    @PostMapping("/api/admin/blogs")
    public Blog createBlog(@Valid @RequestBody BlogRequestDto blog) {
        return blogService.createBlog(blog);
    }

    @PutMapping("/api/admin/blogs/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @Valid @RequestBody BlogRequestDto blog) {
        return ResponseEntity.ok(blogService.updateBlog(id, blog));
    }

    @DeleteMapping("/api/admin/blogs/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok().build();
    }
}