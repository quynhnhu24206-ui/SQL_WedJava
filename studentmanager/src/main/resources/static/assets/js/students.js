const API_URL = "http://localhost:8080/api/students";

document.addEventListener("DOMContentLoaded", () => {
    loadStudents();

    // Lắng nghe sự kiện Submit Form Thêm Sinh Viên
    document.getElementById("studentForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        await saveStudent();
    });
});

// 1. HIỂN THỊ DANH SÁCH SINH VIÊN
async function loadStudents() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Không thể tải danh sách");
        const students = await response.json();
        renderStudents(students);
    } catch (error) {
        document.getElementById("studentTableBody").innerHTML = `
            <tr><td colspan="6" class="text-center text-danger">Lỗi tải dữ liệu sinh viên!</td></tr>
        `;
    }
}

function renderStudents(students) {
    const tbody = document.getElementById("studentTableBody");
    tbody.innerHTML = "";

    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">Chưa có sinh viên nào.</td></tr>`;
        return;
    }

    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.studentCode || ''}</td>
                <td>${student.fullName || ''}</td>
                <td>${student.email || ''}</td>
                <td>${student.phone || ''}</td>
                <td>${student.className || ''}</td>
                <td class="text-end">
                    <div class="d-flex justify-content-end gap-1">
                        <button class="btn btn-info btn-sm text-white" onclick="viewStudent('${student.id}')" title="Xem">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student.id}')" title="Xóa">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// 2. THÊM SINH VIÊN MÓI
async function saveStudent() {
    const studentData = {
        studentCode: document.getElementById("studentCode").value,
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        className: document.getElementById("className").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            // Đóng Modal
            const modalElement = document.getElementById('studentModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();

            // Reset Form & Tải lại bảng
            document.getElementById("studentForm").reset();
            loadStudents();
        } else {
            alert("Thêm sinh viên thất bại!");
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

// 3. XÓA SINH VIÊN
async function deleteStudent(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            loadStudents();
        } else {
            alert("Xóa không thành công!");
        }
    } catch (error) {
        console.error("Lỗi khi xóa:", error);
    }
}

// Hàm mở Modal và xóa trắng input
function openAddModal() {
    document.getElementById("studentForm").reset();
}