package com.sunrobotics.service;

import com.sunrobotics.dto.JobRequestDto;
import com.sunrobotics.exception.ResourceNotFoundException;
import com.sunrobotics.model.Job;
import com.sunrobotics.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;

    // Public: Get only active jobs
    public List<Job> getAllActiveJobs() {
        return jobRepository.findByIsActiveTrue();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    // --- ADMIN METHODS ---

    // Get ALL jobs (Active & Inactive)
    public List<Job> getAllJobsForAdmin() {
        return jobRepository.findAll();
    }

    public Job createJob(JobRequestDto dto) {
        Job job = new Job();
        applyDto(job, dto);
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, JobRequestDto dto) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        applyDto(job, dto);
        return jobRepository.save(job);
    }

    private void applyDto(Job job, JobRequestDto dto) {
        job.setTitle(dto.getTitle());
        job.setDepartment(dto.getDepartment());
        job.setLocation(dto.getLocation());
        job.setType(dto.getType());
        job.setDescription(dto.getDescription());
        job.setRequirements(dto.getRequirements());
        job.setActive(dto.isActive());
    }

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        jobRepository.delete(job);
    }
}