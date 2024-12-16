// src/components/Form.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';

type FormData = {
  bookingId: string;
  totalPrice: string;
  currency: string;
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
};

const initialFormData: FormData = {
  bookingId: '',
  totalPrice: '',
  currency: '',
  companyName: '',
  addressLine1: '',
  addressLine2: '',
  postalCode: '',
  city: ''
};

const finalFormData: FormData = {
  bookingId: 'BC-67890',
  totalPrice: '1500.0',
  currency: 'EUR',
  companyName: 'Acme Corporation',
  addressLine1: '123 Elm Street',
  addressLine2: 'Suite 500',
  postalCode: 'WC2N 5DU',
  city: 'London'
};

const Form = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startStreaming();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const startStreaming = async () => {
    const fields = Object.keys(finalFormData) as (keyof FormData)[];
    
    for (const field of fields) {
      const targetValue = finalFormData[field];
      
      for (let i = 0; i <= targetValue.length; i++) {
        setFormData(prev => ({
          ...prev,
          [field]: targetValue.slice(0, i)
        }));
        await sleep(50);
      }
      
      await sleep(200);
    }
  };

  return (
    <div ref={formRef} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">New Shipment</h3>
        <button className="text-sm text-gray-400 hover:text-white">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm mb-1">Booking ID</label>
          <div className="relative flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
            <input 
              type="text" 
              value={formData.bookingId}
              readOnly
              className="w-full bg-black border border-gray-800 rounded p-2 text-sm pl-3"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm mb-1">Total Price</label>
            <div className="relative flex items-center">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
              <input 
                type="text" 
                value={formData.totalPrice}
                readOnly
                className="w-full bg-black border border-gray-800 rounded p-2 text-sm pl-3"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm mb-1">Currency</label>
            <div className="relative flex items-center">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
              <input 
                type="text" 
                value={formData.currency}
                readOnly
                className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg mb-4">Client</h4>
          
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm mb-1">Company Name</label>
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                <input 
                  type="text" 
                  value={formData.companyName}
                  readOnly
                  className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm mb-1">Address Line 1</label>
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                <input 
                  type="text" 
                  value={formData.addressLine1}
                  readOnly
                  className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm mb-1">Address Line 2</label>
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                <input 
                  type="text" 
                  value={formData.addressLine2}
                  readOnly
                  className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm mb-1">Postal Code *</label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                  <input 
                    type="text" 
                    value={formData.postalCode}
                    readOnly
                    className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm mb-1">City *</label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>
                  <input 
                    type="text" 
                    value={formData.city}
                    readOnly
                    className="w-full bg-black border border-gray-800 rounded p-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-white text-black rounded p-2 hover:bg-gray-200 mt-6">
          Send to ERP
        </button>
      </div>
    </div>
  );
};

export default Form;