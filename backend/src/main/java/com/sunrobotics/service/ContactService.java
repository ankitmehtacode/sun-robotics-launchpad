package com.sunrobotics.service;

import com.sunrobotics.dto.ContactMessageDto;
import com.sunrobotics.exception.ResourceNotFoundException;
import com.sunrobotics.model.ContactMessage;
import com.sunrobotics.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContactService {
    @Autowired
    private ContactMessageRepository repository;

    public ContactMessage saveMessage(ContactMessageDto dto) {
        ContactMessage msg = new ContactMessage();
        msg.setName(dto.getName());
        msg.setEmail(dto.getEmail());
        msg.setCompany(dto.getCompany());
        msg.setPhone(dto.getPhone());
        msg.setSubject(dto.getSubject());
        msg.setMessage(dto.getMessage());
        return repository.save(msg);
    }

    // --- ADMIN METHODS ---

    public List<ContactMessage> getAllMessages() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public ContactMessage markAsRead(Long id) {
        ContactMessage msg = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found"));
        msg.setRead(true);
        return repository.save(msg);
    }

    public void deleteMessage(Long id) {
        repository.deleteById(id);
    }
}