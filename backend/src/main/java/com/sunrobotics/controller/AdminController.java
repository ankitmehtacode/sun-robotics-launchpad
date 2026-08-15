package com.sunrobotics.controller;

import com.sunrobotics.dto.JobRequestDto;
import com.sunrobotics.model.Application;
import com.sunrobotics.model.ContactMessage;
import com.sunrobotics.model.Job;
import com.sunrobotics.service.ApplicationService;
import com.sunrobotics.service.ContactService;
import com.sunrobotics.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
// @CrossOrigin(origins = "http://localhost:5173") // Use if Global CORS doesn't cover it
public class AdminController {

    @Autowired
    private JobService jobService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private ContactService contactService;

    // --- JOB MANAGEMENT ---

    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobService.getAllJobsForAdmin();
    }

    @PostMapping("/jobs")
    public ResponseEntity<Job> createJob(@Valid @RequestBody JobRequestDto job) {
        return ResponseEntity.ok(jobService.createJob(job));
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @Valid @RequestBody JobRequestDto jobDetails) {
        return ResponseEntity.ok(jobService.updateJob(id, jobDetails));
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok().body(Map.of("message", "Job deleted successfully"));
    }

    // --- APPLICATION MANAGEMENT ---

    @GetMapping("/applications")
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @PatchMapping("/applications/{id}/status")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusMap) {
        String status = statusMap.get("status");
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }

    // --- CONTACT MESSAGES ---

    @GetMapping("/messages")
    public List<ContactMessage> getAllMessages() {
        return contactService.getAllMessages();
    }

    @PatchMapping("/messages/{id}/read")
    public ResponseEntity<ContactMessage> markMessageAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.ok().body(Map.of("message", "Message deleted successfully"));
    }
}