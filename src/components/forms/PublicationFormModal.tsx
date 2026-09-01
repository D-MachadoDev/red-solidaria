import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryType, ItemCondition, PublicationType } from '../../types';

const CATEGORIES: CategoryType[] = [
  'Tecnología',
  'Ropa',
  'Alimentos',
  'Muebles',
  'Salud/Medicinas',
  'Juguetes',
  'Mascotas',
  'Herramientas',
  'Educación',
];

const CONDITIONS: ItemCondition[] = [
  'Nuevo / Sin Usar',
  'Como Nuevo',
  'Buen Estado',
  'Usado Aceptable',
];

export const PublicationFormModal: React.FC = () => {
  const { isCreateModalOpen, closeCreateModal, createModalType, addPublication, currentUser } = useApp();

  const [type, setType] = useState<PublicationType>(createModalType);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('Tecnología');
  const [condition, setCondition] = useState<ItemCondition>('Buen Estado');
  const [locationName, setLocationName] = useState(currentUser.location || 'Chapinero, Bogotá');
  const [urgent, setUrgent] = useState(false);
  const [emergencyTag, setEmergencyTag] = useState('');
  const [goalCount, setGoalCount] = useState<number>(1);
  const [unit, setUnit] = useState('unidades');

  // Form image URL states
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Synchronize modal type whenever modal opens or createModalType changes
  useEffect(() => {
    if (isCreateModalOpen) {
      setType(createModalType);
      setErrors({});
      setImages([
        createModalType === 'donation'
          ? 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop'
          : 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=600&fit=crop',
      ]);
    }
  }, [isCreateModalOpen, createModalType]);

  if (!isCreateModalOpen) return null;

  const handleAddImage = () => {
    if (imageUrlInput.trim()) {
      setImages((prev) => [...prev, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) errs.title = 'El título de la publicación es obligatorio.';
    if (title.length < 5) errs.title = 'El título debe tener al menos 5 caracteres.';
    if (!description.trim()) errs.description = 'Por favor incluye una breve descripción.';
    if (!locationName.trim()) errs.locationName = 'Ingresa la ubicación o barrio de entrega.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addPublication({
      type,
      title: title.trim(),
      description: description.trim(),
      category,
      condition,
      images,
      locationName: locationName.trim(),
      urgent,
      emergencyTag: urgent ? emergencyTag || 'Emergencia' : undefined,
      goalCount: type === 'request' ? Number(goalCount) : undefined,
      unit: type === 'request' ? unit : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#F7F4EF] rounded-3xl max-w-2xl w-full border border-[#E6E1DA] shadow-elevated overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E6E1DA] flex items-center justify-between">
          <div>
            <h3 className="font-serif-warm text-xl font-bold text-[#1C1814]">
              {type === 'donation' ? 'Regalar un objeto (Donación)' : 'Solicitar ayuda (Necesidad)'}
            </h3>
            <p className="text-xs text-[#756D65]">Llena los datos concretos para conectar con otras personas</p>
          </div>
          <button
            onClick={closeCreateModal}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Type Toggle Switch */}
        <div className="p-4 bg-white border-b border-[#E6E1DA] flex gap-2">
          <button
            type="button"
            onClick={() => setType('donation')}
            className={`flex-1 py-2.5 rounded-2xl text-xs font-bold transition ${
              type === 'donation'
                ? 'bg-[#C4623A] text-white shadow-sm'
                : 'bg-[#F0EBE3] text-[#756D65] hover:bg-gray-200'
            }`}
          >
            Quiero Donar (Regalar)
          </button>
          <button
            type="button"
            onClick={() => setType('request')}
            className={`flex-1 py-2.5 rounded-2xl text-xs font-bold transition ${
              type === 'request'
                ? 'bg-[#2D6A4F] text-white shadow-sm'
                : 'bg-[#F0EBE3] text-[#756D65] hover:bg-gray-200'
            }`}
          >
            Necesito Ayuda (Solicitar)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#1C1814] mb-1">
              Título de la publicación <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={
                type === 'donation'
                  ? 'Ej. Televisor 42 pulgadas en buen estado'
                  : 'Ej. Se necesitan muletas para adulto mayor'
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2.5 bg-white border rounded-2xl text-xs sm:text-sm text-[#1C1814] focus:outline-none transition ${
                errors.title ? 'border-red-500 ring-2 ring-red-100' : 'border-[#E6E1DA] focus:border-[#C4623A]'
              }`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1 font-medium">{errors.title}</p>}
          </div>

          {/* Category & Condition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1C1814] mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-4 py-2.5 bg-white border border-[#E6E1DA] rounded-2xl text-xs sm:text-sm text-[#1C1814] focus:outline-none focus:border-[#C4623A]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1814] mb-1">Estado del objeto</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full px-4 py-2.5 bg-white border border-[#E6E1DA] rounded-2xl text-xs sm:text-sm text-[#1C1814] focus:outline-none focus:border-[#C4623A]"
              >
                {CONDITIONS.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Name */}
          <div>
            <label className="block text-xs font-bold text-[#1C1814] mb-1">
              Barrio o localidad <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej. Teusaquillo, Bogotá"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className={`w-full px-4 py-2.5 bg-white border rounded-2xl text-xs sm:text-sm text-[#1C1814] focus:outline-none transition ${
                errors.locationName ? 'border-red-500 ring-2 ring-red-100' : 'border-[#E6E1DA] focus:border-[#C4623A]'
              }`}
            />
            {errors.locationName && <p className="text-xs text-red-500 mt-1 font-medium">{errors.locationName}</p>}
          </div>

          {/* Goal & Unit for Requests */}
          {type === 'request' && (
            <div className="grid grid-cols-2 gap-4 bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
              <div>
                <label className="block text-xs font-bold text-emerald-900 mb-1">Cantidad necesaria</label>
                <input
                  type="number"
                  min={1}
                  value={goalCount}
                  onChange={(e) => setGoalCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs text-[#1C1814]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-900 mb-1">Unidad</label>
                <input
                  type="text"
                  placeholder="ej. unidades, bultos, cobijas"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs text-[#1C1814]"
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#1C1814] mb-1">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Explica brevemente el estado del objeto o la situación para recibir ayuda..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-2.5 bg-white border rounded-2xl text-xs sm:text-sm text-[#1C1814] focus:outline-none transition ${
                errors.description ? 'border-red-500 ring-2 ring-red-100' : 'border-[#E6E1DA] focus:border-[#C4623A]'
              }`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1 font-medium">{errors.description}</p>}
          </div>

          {/* Image Upload Simulator */}
          <div>
            <label className="block text-xs font-bold text-[#1C1814] mb-1">Fotos</label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                placeholder="Pegar enlace de imagen..."
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#FFFFFF] border border-[#E6E1DA] rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-[#F0EBE3] hover:bg-[#E6E1DA] text-[#1C1814] px-3 py-2 rounded-xl text-xs font-bold"
              >
                + Añadir
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#E6E1DA] shrink-0">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Urgency Toggle */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-amber-900">Caso de alta urgencia o emergencia</p>
              <p className="text-[11px] text-amber-700">Se mostrará destacado en la parte superior del listado.</p>
            </div>
            <input
              type="checkbox"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="w-5 h-5 accent-[#C4623A] rounded cursor-pointer"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#E6E1DA] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeCreateModal}
              className="px-5 py-2.5 rounded-2xl text-xs font-semibold text-[#6B6258] hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white shadow-md transition active-press ${
                type === 'donation' ? 'bg-[#C4623A] hover:bg-[#AB512C]' : 'bg-[#2D6A4F] hover:bg-[#23533E]'
              }`}
            >
              {type === 'donation' ? 'Publicar donación' : 'Publicar solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
