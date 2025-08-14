'use client';

import { useState } from 'react';
import Image from 'next/image';
import ContactPage from '@/components/ContactPage';
export default function ContactPagee() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nom requis';
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Sujet requis';
    if (!formData.message.trim()) newErrors.message = 'Message requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Données envoyées:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className=" mx-auto  py-12 pt-[50px]">
      {/* Titre */}
     



      <ContactPage />


     
    </div>
  );
}