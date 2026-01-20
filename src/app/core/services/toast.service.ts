import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../models/common.models';


// Service for managing application-wide toast notifications
@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toastsSubject = new BehaviorSubject<Toast[]>([]);
    public toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();
    private nextId = 0;

    // Displays a success toast notification
    success(message: string, duration: number = 5000): void {
        this.show('success', message, duration);
    }

    // Displays an error toast notification
    error(message: string, duration: number = 5000): void {
        this.show('error', message, duration);
    }

    // Displays an info toast notification
    info(message: string, duration: number = 5000): void {
        this.show('info', message, duration);
    }

    // Internal method to create and manage toast lifecycle
    private show(type: 'success' | 'error' | 'info', message: string, duration: number): void {
        if (!message || message.trim() === '') return;

        const toast: Toast = {
            id: this.nextId++,
            type,
            message,
            duration
        };

        const currentToasts = this.toastsSubject.value;
        this.toastsSubject.next([...currentToasts, toast]);

        // Auto-dismiss after duration
        if (duration > 0) {
            setTimeout(() => this.remove(toast.id), duration);
        }
    }

    // Removes a specific toast by its ID
    remove(id: number): void {
        const currentToasts = this.toastsSubject.value;
        this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
    }

    // Clears all active toast notifications
    clear(): void {
        this.toastsSubject.next([]);
    }
}
