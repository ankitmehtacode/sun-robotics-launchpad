package com.sunrobotics.service;

import com.sunrobotics.dto.BlogRequestDto;
import com.sunrobotics.exception.ResourceNotFoundException;
import com.sunrobotics.model.Blog;
import com.sunrobotics.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public Blog createBlog(BlogRequestDto dto) {
        Blog blog = new Blog();
        applyDto(blog, dto);
        blog.setCreatedAt(LocalDateTime.now());
        blog.setUpdatedAt(LocalDateTime.now());
        return blogRepository.save(blog);
    }

    public Blog updateBlog(Long id, BlogRequestDto dto) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
        applyDto(blog, dto);
        blog.setUpdatedAt(LocalDateTime.now());
        return blogRepository.save(blog);
    }

    private void applyDto(Blog blog, BlogRequestDto dto) {
        blog.setTitle(dto.getTitle());
        blog.setExcerpt(dto.getExcerpt());
        blog.setContent(dto.getContent());
        blog.setCategory(dto.getCategory());
        blog.setAuthor(dto.getAuthor());
        blog.setImageUrl(dto.getImageUrl());
        blog.setReadTime(dto.getReadTime());
    }

    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
}