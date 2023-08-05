import { Modal } from "../../../../Components/Modal";
import { useNewAccountModal } from "./useNewAccountModal";

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useNewAccountModal();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      New Account Modal
    </Modal>
  );
}
