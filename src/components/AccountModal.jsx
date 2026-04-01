import React, { useState, useEffect } from 'react';
import { X, User, ShoppingBag, Settings, LogOut, ChevronRight, Edit2, Check } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const AccountModal = ({ isOpen, onClose }) => {
  const { user, userData, logout, updateProfile } = useUser();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders'
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (isOpen && activeTab === 'orders' && user) {
      fetchOrders();
    }
  }, [isOpen, activeTab, user]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
    setLoadingOrders(false);
  };

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const res = await updateProfile(formData);
    if (res.success) {
      setIsEditing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div
        className="bg-brand-pink relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl border-4 border-brand-green flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-brand-green/10 border-b md:border-b-0 md:border-r border-brand-green/20 p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-black text-xl italic">
              {userData?.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-black text-brand-green truncate italic">{userData?.name || 'User'}</p>
              <p className="text-xs text-brand-green/60 truncate italic">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-brand-green text-white shadow-lg' : 'text-brand-green hover:bg-brand-green/10'}`}
          >
            <User size={20} /> Profile Details
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-brand-green text-white shadow-lg' : 'text-brand-green hover:bg-brand-green/10'}`}
          >
            <ShoppingBag size={20} /> Order History
          </button>

          <div className="mt-auto pt-8">
            <button
              onClick={() => { logout(); onClose(); }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all w-full"
            >
              <LogOut size={20} /> Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-brand-green hover:bg-white transition-colors"
          >
            <X size={24} />
          </button>

          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black italic tracking-tighter text-brand-green uppercase">
                    Your <span className="text-white">Profile</span>
                  </h2>
                  <p className="text-sm text-brand-green/70 font-bold italic">Manage your personalization details</p>
                </div>
                <button
                  onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${isEditing ? 'bg-white text-brand-green' : 'bg-brand-green text-white'}`}
                >
                  {isEditing ? <><Check size={18} /> Save Changes</> : <><Edit2 size={18} /> Edit Profile</>}
                </button>
              </div>

              {/* Stats Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/40 p-4 rounded-[2rem] border-2 border-brand-green/20 text-center">
                  <p className="text-xs font-bold text-brand-green/60 uppercase">Daily Target</p>
                  <p className="text-2xl font-black text-brand-green italic">{userData?.calories || '0'} <span className="text-sm">kcal</span></p>
                </div>
                <div className="bg-white/40 p-4 rounded-[2rem] border-2 border-brand-green/20 text-center">
                  <p className="text-xs font-bold text-brand-green/60 uppercase">Weight</p>
                  <p className="text-2xl font-black text-brand-green italic">{userData?.weight || '0'} <span className="text-sm">kg</span></p>
                </div>
                <div className="bg-white/40 p-4 rounded-[2rem] border-2 border-brand-green/20 text-center">
                  <p className="text-xs font-bold text-brand-green/60 uppercase">Main Goal</p>
                  <p className="text-sm font-black text-brand-green italic truncate px-2">{userData?.goals?.[0] || 'Health'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/30 p-8 rounded-[2.5rem] border-2 border-brand-green/10">
                <ProfileField label="Full Name" name="name" value={formData.name} isEditing={isEditing} onChange={handleChange} />
                <ProfileField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} isEditing={isEditing} onChange={handleChange} />
                <ProfileField label="Age" name="age" value={formData.age} isEditing={isEditing} onChange={handleChange} type="number" />
                <ProfileField label="Gender" name="gender" value={formData.gender} isEditing={isEditing} onChange={handleChange} type="select" options={['male', 'female']} />
                <ProfileField label="Weight (kg)" name="weight" value={formData.weight} isEditing={isEditing} onChange={handleChange} type="number" />
                <ProfileField label="Alt. Phone (Opt)" name="altPhoneNumber" value={formData.altPhoneNumber} isEditing={isEditing} onChange={handleChange} />
                <ProfileField label="Landmark" name="landmark" value={formData.landmark} isEditing={isEditing} onChange={handleChange} />
                <ProfileField label="Postal Code" name="postalCode" value={formData.postalCode} isEditing={isEditing} onChange={handleChange} />
                
                <div className="md:col-span-2">
                  <ProfileField label="Street Address" name="streetaddress" value={formData.streetaddress} isEditing={isEditing} onChange={handleChange} type="textarea" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-brand-green font-bold mb-1.5 ml-2 text-xs uppercase opacity-60">Health Goals</label>
                  <p className="font-black text-brand-green bg-white/40 px-5 py-2.5 rounded-full border border-brand-green/10">
                    {userData?.goals?.join(', ') || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="animate-fade-in h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-3xl font-black italic tracking-tighter text-brand-green uppercase">
                  Order <span className="text-white">History</span>
                </h2>
                <p className="text-sm text-brand-green/70 font-bold italic">Keep track of your clean eating journey</p>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
                {loadingOrders ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
                  </div>
                ) : orders.length > 0 ? (
                  orders.map(order => (
                    <div key={order.id} className="bg-white/40 p-6 rounded-[2rem] border-2 border-brand-green/20 hover:border-brand-green/40 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xs font-bold text-brand-green/60 uppercase">Order #{order.id.slice(-6).toUpperCase()}</p>
                          <p className="font-black text-brand-green italic">{new Date(order.createdAt?.toDate()).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-brand-green text-xl italic font-black">₹{order.total}</p>
                          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-brand-green text-white uppercase tracking-wider">{order.status || 'Delivered'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex-shrink-0 bg-white/50 px-4 py-2 rounded-xl text-xs font-bold text-brand-green">
                            {item.name} x {item.quantity}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center bg-white/20 rounded-[2rem] border-2 border-dashed border-brand-green/20">
                    <ShoppingBag size={48} className="text-brand-green/30 mb-4" />
                    <p className="font-bold text-brand-green italic">No orders yet!</p>
                    <p className="text-sm text-brand-green/60 italic">Start your journey today.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, name, value, isEditing, onChange, type = 'text', options = [] }) => (
  <div>
    <label className="block text-brand-green font-bold mb-1.5 ml-2 text-xs uppercase opacity-60">{label}</label>
    {isEditing ? (
      type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-white border-2 border-brand-green/30 rounded-full px-5 py-2.5 text-brand-dark focus:outline-none focus:border-brand-green transition-all font-bold"
        >
          {options.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows="3"
          className="w-full bg-white border-2 border-brand-green/30 rounded-3xl px-5 py-2.5 text-brand-dark focus:outline-none focus:border-brand-green transition-all font-bold resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-white border-2 border-brand-green/30 rounded-full px-5 py-2.5 text-brand-dark focus:outline-none focus:border-brand-green transition-all font-bold"
        />
      )
    ) : (
      <p className={`font-black text-brand-green bg-white/40 px-5 py-2.5 rounded-[1.5rem] border border-brand-green/10 min-h-[44px] ${type === 'textarea' ? 'whitespace-pre-wrap' : ''}`}>
        {value || (type === 'textarea' ? 'No address provided' : 'Not provided')}
      </p>
    )}
  </div>
);

export default AccountModal;
