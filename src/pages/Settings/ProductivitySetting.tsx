import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { HexColorPicker } from 'react-colorful';
import Button from '../../components/CustomButton/CustomButton';
import { ProductivityRange } from '../../utils/mockData';
import { fetchaAddUpdateSettingRequest } from '../../redux/setting/action';
import './Setting.css';
import { SettingRootState } from '../../utils/type';

const ProductivitySetting = () => {
  const hexColor = '#00FF00';
  const dispatch = useDispatch();
  const productivity = useSelector(
    (state: SettingRootState) => state?.settings?.data?.productivity
  );

  const [selectedColours, setSelectedColours] = useState<{
    [key: string]: string;
  }>({});
  const [activeColorPickerKey, setActiveColorPickerKey] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (productivity) {
      setSelectedColours({
        unproductiveColor: productivity.unproductiveColor,
        neutralColor: productivity.neutralColor,
        productiveColor: productivity.productiveColor,
      });
    }
  }, [productivity]);

  const colorPickerRef = useRef<HTMLDivElement | null>(null);

  const isUpdate = 
    selectedColours['unproductiveColor'] || selectedColours['neutralColor'] || selectedColours['productiveColor'];

  const handleColourChange = (key: string) => (selectedColour: string) => {
    setSelectedColours((prev) => ({ ...prev, [key]: selectedColour }));
  };

  const toggleColorPicker = (key: string) => {
    setActiveColorPickerKey((prev) => (prev === key ? null : key));
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the click is outside the color picker and input field
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target as Node)
    ) {
      setActiveColorPickerKey(null); // Close color picker
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedColours['unproductiveColor'] || !selectedColours['neutralColor'] || !selectedColours['productiveColor']) {
      toast.error('Please select colors for all ranges before submitting.');
      return;
    }

    const payload = {
      productivity: {
        unproductiveColor: selectedColours['unproductiveColor'] || hexColor,
        neutralColor: selectedColours['neutralColor'] || hexColor,
        productiveColor: selectedColours['productiveColor'] || hexColor,
      },
    };

    dispatch(fetchaAddUpdateSettingRequest(payload))
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className='setting-label'>Range Colours</label>
        <div>
          {ProductivityRange.map((item) => (
            <div
              key={item.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <div style={{ width: '10rem' }}>{item.rangeTitle} :</div>
              <div
                style={{ position: 'relative', flex: '1', marginLeft: '1rem' }}
              >
                <input
                  type='text'
                  value={selectedColours[item.value] || ''}
                  onChange={(e) =>
                    handleColourChange(item.value)(e.target.value)
                  }
                  className='leave-color-input'
                  placeholder='Enter Hex Color'
                />
                <span
                  className='leave-color-preview'
                  style={{
                    backgroundColor: selectedColours[item.value] || hexColor,
                  }}
                  onClick={() => toggleColorPicker(item.value)}
                ></span>

                {activeColorPickerKey === item.value && (
                  <div ref={colorPickerRef} className='color-picker-container'>
                    <HexColorPicker
                      color={selectedColours[item.value] || hexColor}
                      onChange={handleColourChange(item.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button type='submit' className='update-button-style'>
        {isUpdate ? 'Update' : 'Add'}
        </Button>
      </form>
    </div>
  );
};

export default ProductivitySetting;
