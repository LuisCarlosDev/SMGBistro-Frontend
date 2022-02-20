import { FormEvent, useCallback, useContext, useRef, useState } from 'react';
import { Form as Unform } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiX } from 'react-icons/fi';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

type ProductResponse = {
  id: string;
  name: string;
}

interface EditProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingProduct: ProductResponse;
  updateProduct(data: Omit<ProductResponse, 'id'>): void;
}

export function EditProductModal({ isOpen, onRequestClose, editingProduct, updateProduct }: EditProductModalProps) {
  // const { updateProduct, product  } = useContext(ProductsContext);

  const formRef = useRef<FormHandles>(null);

  // const { register, handleSubmit } = useForm();

  /* async function handleEditProduct(data: ProductResponse) {
    updateProduct(data)
  } */

  const handleSubmit = useCallback(() => {
    async (data: ProductResponse) => {
      updateProduct(data);

      toast.success('Produto atualizado com sucesso')

    }
  }, [updateProduct]);

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
      <Unform
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingProduct}
      >
        <h2>Editar produto</h2>
        <input
          name='product'
          placeholder='Novo nome'
        />

        <button>Atualizar</button>
      </Unform>
    </Modal>
  )
}
