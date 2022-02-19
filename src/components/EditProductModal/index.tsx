import { FormEvent, useCallback, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import Modal from 'react-modal';
import { ProductsContext, } from '../../hooks/product';
import api from '../../services/api';

type ProductResponse = {
  id: string;
  name: string;
}

interface EditProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function EditProductModal({ isOpen, onRequestClose }: EditProductModalProps, id) {
  const { updateProduct } = useContext(ProductsContext);

  const { register, handleSubmit } = useForm();

  /* async function handleEditProduct(data: ProductResponse) {
    handleUpdateProduct(data);
  } */
console.log(id)
  function onSubmit(product: ProductResponse) {
    updateProduct(product);

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <FiX size={18} color='#3D3D4D' />
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Editar produto</h2>
        <input
          name='product'
          placeholder='Novo nome'
          {...register('product')}
        />

        <button type='submit'>Atualizar</button>
      </form>
    </Modal>
  )
}
