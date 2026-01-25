'use client';

import React from "react"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface FormData {
  name: string;
  email: string;
  phone: string;
  attending: string;
  dietary: string[];
  accommodation: string;
  flightDetails: string;
  message: string;
}

interface RSVPFormProps {
  onSubmitSuccess?: () => void;
}

export function RSVPForm({ onSubmitSuccess }: RSVPFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    attending: 'yes',
    dietary: [],
    accommodation: '',
    flightDetails: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDietaryChange = (option: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, dietary: [...prev.dietary, option] };
      } else {
        return { ...prev, dietary: prev.dietary.filter((item) => item !== option) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim() || (!formData.email.trim() && !formData.phone.trim())) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setLoading(true);

    try {
      // Submit to Google Sheets via Apps Script
      const response = await fetch(
        'https://script.google.com/macros/d/AKfycbyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/usercopy',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            timestamp: new Date().toISOString(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            attending: formData.attending,
            dietary: formData.dietary.join(', '),
            message: formData.message,
          }).toString(),
        }
      );

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        attending: 'yes',
        dietary: '',
        accommodation: '',
        flightDetails: '',
        message: '',
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Scroll to top to see success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Lỗi khi gửi biểu mẫu:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-6">
        <div className="mb-6">
          <div className="inline-block">
            <svg
              className="w-16 h-16 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-serif text-primary mb-3">Thank you!</h3>
        <p className="text-foreground mb-2">
          We're so glad to have your confirmation.
        </p>
        <p className="text-muted-foreground mb-6">
          We'll be in touch soon with more details.
        </p>
        <        Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="text-primary border-primary hover:bg-primary/5"
        >
          Back
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Name */}
        <div className="space-y-3">
          <Label htmlFor="name" className="text-base font-medium text-foreground">
            What's your name? <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Let us know how to call you"
            value={formData.name}
            onChange={handleInputChange}
            className="h-12 border-muted focus:border-primary"
            required
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-foreground">
            Contact info <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">
            Please provide at least one (phone or email)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm text-muted-foreground">
                Phone (WhatsApp)
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+84 ..."
                value={formData.phone}
                onChange={handleInputChange}
                className="h-11 border-muted focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="h-11 border-muted focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-foreground">
            Will you be able to join us? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup value={formData.attending} onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, attending: value }))
          }>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="yes" id="attend-yes" />
              <Label htmlFor="attend-yes" className="font-normal cursor-pointer">
                Yes, I'll be there
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="no" id="attend-no" />
              <Label htmlFor="attend-no" className="font-normal cursor-pointer">
                No, I won't be able to make it
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Dietary Preferences */}
        <div className="space-y-3">
          <Label htmlFor="dietary" className="text-base font-medium text-foreground">
            Dietary preferences (optional)
          </Label>
          <Textarea
            id="dietary"
            name="dietary"
            placeholder="E.g., vegetarian, no seafood, allergies, etc."
            value={formData.dietary}
            onChange={handleInputChange}
            className="min-h-20 border-muted focus:border-primary"
          />
        </div>

        {/* Accommodation Preferences */}
        <div className="space-y-3">
          <Label htmlFor="accommodation" className="text-base font-medium text-foreground">
            Room upgrades or notes (optional)
          </Label>
          <Textarea
            id="accommodation"
            name="accommodation"
            placeholder="Let us know if you'd like a specific room type, have mobility needs, or any other preferences..."
            value={formData.accommodation}
            onChange={handleInputChange}
            className="min-h-20 border-muted focus:border-primary"
          />
        </div>

        {/* Flight Details */}
        <div className="space-y-3">
          <Label htmlFor="flightDetails" className="text-base font-medium text-foreground">
            Flight details (optional)
          </Label>
          <Textarea
            id="flightDetails"
            name="flightDetails"
            placeholder="Arrival/departure dates and flight numbers if you'd like us to arrange airport transport..."
            value={formData.flightDetails}
            onChange={handleInputChange}
            className="min-h-20 border-muted focus:border-primary"
          />
        </div>

        {/* Personal Message */}
        <div className="space-y-3">
          <Label htmlFor="message" className="text-base font-medium text-foreground">
            Message for us (optional)
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Share any wishes or a personal note..."
            value={formData.message}
            onChange={handleInputChange}
            className="min-h-24 border-muted focus:border-primary"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {loading ? 'Submitting...' : 'Confirm'}
          </Button>
        </div>
      </div>
    </form>
  );
}
