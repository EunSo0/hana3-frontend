import { useOutletContext } from 'react-router-dom';
import { useSession } from '../../contexts/session-context';
import { Input } from '../ui/Input';
import { FormEvent, useId, useRef } from 'react';
import { useToggle } from '../../hooks/toggle';
import { Button } from '../ui/Button';

type OutletType = {
  setOutletItem: (item: Cart) => void;
};

export const Items = () => {
  const {
    session: { cart },
    saveItem,
  } = useSession();

  const [isAdding, toggleAdding] = useToggle(false);

  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const nameId = useId();
  const priceId = useId();

  const { setOutletItem } = useOutletContext<OutletType>();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = itemNameRef.current?.value;
    const price = Number(itemPriceRef.current?.value);

    if (!name) {
      alert('상품명을 정확히 입력하세요!');
      itemNameRef.current?.focus();
      return;
    } else if (isNaN(price) || !price) {
      alert('가격을 정확히 입력하세요!');
      itemPriceRef.current?.focus();
      return;
    }

    saveItem({ id: 0, name, price });
    itemNameRef.current.value = '';
    if (itemPriceRef.current) itemPriceRef.current.value = '';
  };

  return (
    <>
      <h1 className='text-bold text-xl'>ItemList</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <button onClick={() => setOutletItem(item)}>
              {item.name}
              <small className='text-gray-300 ml-2'>
                (₩ {item.price.toLocaleString()})
              </small>
            </button>
          </li>
        ))}
      </ul>

      {isAdding ? (
        <form
          onSubmit={submitHandler}
          onReset={() => toggleAdding()}
          className='border p-5 m-3'
        >
          <div className='flex flex-row'>
            <label htmlFor={nameId} className='basis-1/4'>
              상품명
            </label>
            <Input
              type='text'
              id={nameId}
              ref={itemNameRef}
              className='basis3/4'
            />
          </div>
          <div className='flex flex-row my-3'>
            <label htmlFor={priceId} className='basis-1/4'>
              가격
            </label>
            <Input
              type='text'
              id={priceId}
              ref={itemPriceRef}
              className='basis3/4'
            />
          </div>

          <div className='text-right'>
            <Button type='reset' variant='default' className='btn-defualt'>
              취소
            </Button>
            <Button type='submit' variant='primary' className='ml-5'>
              추가
            </Button>
          </div>
        </form>
      ) : (
        <div className='text-right'>
          <Button
            onClick={() => toggleAdding()}
            variant='default'
            className='mt-5'
          >
            Add
          </Button>
        </div>
      )}
    </>
  );
};
