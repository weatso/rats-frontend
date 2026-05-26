'use server'

const API_BASE = process.env.NEXT_PUBLIC_API_URL

export async function submitBooking(formData) {
    try {
        const response = await fetch(`${API_BASE}/api/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                branch_id: formData.branch,
                room_id: formData.room,
                customer_name: formData.name,
                customer_phone: formData.whatsapp,
                customer_email: formData.email,
                start_time: `${formData.date} ${formData.startTime}:00`,
                duration_hours: formData.duration,
                notes: formData.notes || ''
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Gagal terhubung ke server RATS Game');
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
