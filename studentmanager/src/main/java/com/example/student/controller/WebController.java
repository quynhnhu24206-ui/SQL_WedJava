package com.example.student.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/students")
    public String studentsPage() {
        return "students";
    }

    @GetMapping("/admin/students")
    public String adminStudentsPage() {
        return "adminlte-students";
    }
}