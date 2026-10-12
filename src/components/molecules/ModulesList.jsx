import { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalStore } from '../../store/GlobalStore';
import { usePermissionsStore } from '../../store/PermissionsStore';

export function ModulesList({ setCheckboxes, checkboxes = [], action }) {
  const { modulesData } = useGlobalStore();
  const { permissionsEditData } = usePermissionsStore();

  useEffect(() => {
    if (action == 'Edit') {
      let allDocs = [];
      modulesData.map((element) => {
        const hasPermission = permissionsEditData?.some((permission) =>
          permission.modules.name.includes(element.name),
        );
        if (hasPermission) {
          allDocs.push({ ...element, check: true });
        } else {
          allDocs.push({ ...element, check: false });
        }
      });
      setCheckboxes(allDocs);
    } else {
      setCheckboxes(modulesData);
    }
  }, [action, modulesData, permissionsEditData, setCheckboxes]);

  function handleCheckbox(id) {
    setCheckboxes((prev) => {
      return prev?.map((item) => {
        if (item.id === id) {
          return { ...item, check: !item.check };
        } else {
          return { ...item };
        }
      });
    });
  }

  return (
    <Container>
      {checkboxes?.map((item, index) => {
        return (
          <div
            key={index}
            className="content"
            onClick={() => handleCheckbox(item.id)}
          >
            <input
              readOnly
              id={item.id}
              type="checkbox"
              className="checkbox"
              checked={item.check}
            />
            <span>{item.name}</span>
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px dashed #414244;
  border-radius: 15px;
  padding: 20px;
  gap: 15px;
  .content {
    display: flex;
    gap: 20px;
  }
  .checkbox {
    appearance: none;
    overflow: hidden;
    min-width: 30px;
    aspect-ratio: 1/1;
    border-radius: 30% 70% 70% 30%/30% 30% 70% 70%;
    border: 2px solid rgb(255, 102, 0);
    position: relative;
    transition: all 0.2s ease-in-out;
    &::before {
      position: absolute;
      inset: 0;
      content: '';
      font-size: 35px;
      transition: all 0.2s ease-in-out;
    }
    &:checked {
      border: 2px solid rgb(255, 212, 59);
      background: linear-gradient(
        135deg,
        rgb(255, 212, 59) 0%,
        rgb(255, 102, 0) 100%
      );
      box-shadow:
        -5px -5px 30px rgba(255, 212, 59, 1),
        5px 5px 30px rgba(255, 102, 0, 1);
      &::before {
        background: linear-gradient(
          135deg,
          rgb(255, 212, 59) 0%,
          rgb(255, 102, 0) 100%
        );
      }
    }
  }
`;
