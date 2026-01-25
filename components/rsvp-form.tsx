'use client';

import React from "react"
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FormData {
  name: string;
  email: string;
  phone: string;
  attending: string;
  dietary: string;
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
    dietary: '',
    accommodation: '',
    flightDetails: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const formContainerRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  // Scroll to form container when thank you message appears
  useEffect(() => {
    if (submitted && formContainerRef.current) {
      // Use setTimeout to ensure the DOM has updated
      setTimeout(() => {
        formContainerRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [submitted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user types
    if (name === 'name' && errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
    if ((name === 'email' || name === 'phone') && errors.contact) {
      setErrors((prev) => ({ ...prev, contact: undefined }));
    }
  };


  const submitForm = () => {
    const newErrors: { name?: string; contact?: string } = {};

    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.contact = 'Please provide at least one contact method';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      if (newErrors.name && nameInputRef.current) {
        nameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        nameInputRef.current.focus();
      } else if (newErrors.contact && contactSectionRef.current) {
        contactSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setLoading(true);

    // Submit to SheetDB
    fetch('https://sheetdb.io/api/v1/res0vf94ldsnu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          timestamp: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          attending: formData.attending,
          dietary: formData.dietary,
          accommodation: formData.accommodation,
          flightDetails: formData.flightDetails,
          message: formData.message,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
        setSubmitted(true);
        setErrors({});
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
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (submitted) {
    return (
      <div ref={formContainerRef} className="max-w-2xl mx-auto text-center py-12 px-6">
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
        <p className="text-foreground mb-3 text-lg">
          Thank you for letting us know.
        </p>
        <p className="text-muted-foreground">
          We&apos;re grateful to have you as part of this journey and can&apos;t wait to celebrate together.
        </p>
      </div>
    );
  }

  return (
    <div ref={formContainerRef}>
      <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium text-foreground">
            Your name <span className="text-destructive">*</span>
          </Label>
          <Input
            ref={nameInputRef}
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className={`h-12 border-muted focus:border-primary ${errors.name ? 'border-destructive' : ''}`}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Contact Information */}
        <div ref={contactSectionRef} className="space-y-2">
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
                className={`h-11 border-muted focus:border-primary ${errors.contact ? 'border-destructive' : ''}`}
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
                className={`h-11 border-muted focus:border-primary ${errors.contact ? 'border-destructive' : ''}`}
              />
            </div>
          </div>
          {errors.contact && (
            <p className="text-sm text-destructive">{errors.contact}</p>
          )}
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
                Yes, I&apos;ll be there
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="no" id="attend-no" />
              <Label htmlFor="attend-no" className="font-normal cursor-pointer">
                No, I won&apos;t be able to make it
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
            placeholder="Vegetarian, allergies, or food preferences"
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
            placeholder="Room type requests, accessibility needs, or notes"
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
            placeholder="So we can arrange airport pickup"
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
            placeholder="Anything you’d like to share with us?"
            value={formData.message}
            onChange={handleInputChange}
            className="min-h-24 border-muted focus:border-primary"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="button"
            disabled={loading}
            onClick={submitForm}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send my response'}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
