import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Heading,
  Text,
  Input,
  Badge,
} from "../../../components/ui";
import { useAuthStore } from "../auth.store";
import { useProfile } from "../hooks/useProfile";
import { useAddresses } from "../hooks/useAddresses";
import { useTheme } from "../../../context/ThemeContext";
import { Camera, MapPin, Package as PackageIcon, Heart, Pencil, Trash2, Plus, Star } from "lucide-react";

// Mock data for demonstration
const mockOrders = [
  { id: 1, date: "2023-10-01", status: "Delivered", total: "₹500", items: ["Tulsi Mala", "Bhagavad Gita"] },
  { id: 2, date: "2023-09-15", status: "Shipped", total: "₹300", items: ["Kurta Pajama"] },
  { id: 3, date: "2023-08-20", status: "Processing", total: "₹150", items: ["Japa Bag"] },
];

const mockWishlist = [
  { id: 1, name: "Tulsi Mala", price: "₹199", img: "/images/tulsi-mala.jpg", badge: "Bestseller" },
  { id: 2, name: "Bhagavad Gita", price: "₹299", img: "/images/gita.jpg", badge: "Classic" },
  { id: 3, name: "Kurta Pajama", price: "₹799", img: "/images/kurta.jpg", badge: "New" },
  { id: 4, name: "Japa Bag", price: "₹149", img: "/images/japa-bag.jpg", badge: "Popular" },
  { id: 5, name: "Meditation Cushion", price: "₹499", img: "/images/meditation-cushion.jpg", badge: "Trending" },
  { id: 6, name: "Incense Sticks", price: "₹99", img: "/images/incense-sticks.jpg", badge: "Essential" },
  { id: 7, name: "Yoga Mat", price: "₹699", img: "/images/yoga-mat.jpg", badge: "Top Rated" },
  { id: 8, name: "Spiritual Journal", price: "₹249", img: "/images/spiritual-journal.jpg", badge: "New Arrival" },
];

export default function ProfilePage() {
  const userId = useAuthStore((s) => s.userId);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { profile, isLoading: profileLoading, updateProfile } = useProfile(userId);
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddresses();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ date_of_birth: "", gender: "" });

  const onEditProfileClick = () => {
    setProfileForm({
      date_of_birth: profile?.date_of_birth || "",
      gender: profile?.gender || "",
    });
    setIsEditingProfile(true);
  };
  const onSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({  data: profileForm });
    setIsEditingProfile(false);
  };

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    address_line_1: "", address_line_2: "", city: "", state: "", country: "", postal_code: "",
  });

  const onEditAddress = (addr) => {
    setEditAddress(addr);
    setAddressForm({
      address_line_1: addr.address_line_1,
      address_line_2: addr.address_line_2,
      city: addr.city,
      state: addr.state,
      country: addr.country,
      postal_code: addr.postal_code,
    });
    setShowAddressForm(true);
  };

  const onAddAddress = (e) => {
    e.preventDefault();
    addAddress(addressForm);
    setShowAddressForm(false);
    setAddressForm({ address_line_1: "", address_line_2: "", city: "", state: "", country: "", postal_code: "" });
  };
  const onUpdateAddress = (e) => {
    e.preventDefault();
    updateAddress({ id: editAddress.id, data: addressForm });
    setShowAddressForm(false);
    setEditAddress(null);
  };
  const onDeleteAddress = (id) => deleteAddress({ id });
  const onSetDefault = (id) => setDefaultAddress({ id });

  useEffect(() => {
    if (!showAddressForm) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [showAddressForm]);

  const addressItemClass = isDark
    ? "bg-white/[0.04] border border-white/10"
    : "bg-ivory-50 border border-ink-100";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <p className="text-saffron-700 dark:text-primary-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
          Your Sacred Space
        </p>
        <Heading level={2} data-testid="profile-page-title">My Profile</Heading>
      </div>

      {/* Profile Header with Photo Upload */}
      <Card variant="glass" hover={false} className="mb-8" data-testid="profile-info-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Profile Information</CardTitle>
            {!isEditingProfile && (
              <Button variant="outline" size="sm" onClick={onEditProfileClick} data-testid="edit-profile-button">
                <Pencil size={14} /> Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {profileLoading ? (
            <Text>Loading profile...</Text>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <img
                    src={profile?.profile_picture || "/images/default-avatar.jpg"}
                    alt="Profile"
                    className={`w-28 h-28 md:w-32 md:h-32 rounded-full object-cover ring-4
                      ${isDark ? "ring-primary-400/40" : "ring-saffron-300/70 shadow-sacred"}`}
                  />
                  <label className={`absolute bottom-0 right-0 rounded-full p-2 cursor-pointer transition-all
                    ${isDark
                      ? "bg-primary-500 hover:bg-primary-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                      : "bg-saffron-600 hover:bg-saffron-500 text-white shadow-sacred"
                    }`}>
                    <input type="file" className="hidden" accept="image/*" data-testid="profile-image-upload" />
                    <Camera size={14} />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 w-full">
                  <div>
                    <Text color="muted" size="sm">Full Name</Text>
                    <Text color="ink" className="font-semibold">{profile?.user?.full_name || "-"}</Text>
                  </div>
                  <div>
                    <Text color="muted" size="sm">Email</Text>
                    <Text color="ink" className="font-semibold">{profile?.user?.email || "-"}</Text>
                  </div>
                  <div>
                    <Text color="muted" size="sm">Mobile Number</Text>
                    <Text color="ink" className="font-semibold">{profile?.user?.mobile_number || "-"}</Text>
                  </div>
                  <div>
                    <Text color="muted" size="sm">Date of Birth</Text>
                    {isEditingProfile ? (
                      <Input
                        type="date"
                        value={profileForm.date_of_birth}
                        onChange={(e) => setProfileForm({ ...profileForm, date_of_birth: e.target.value })}
                        data-testid="profile-dob-input"
                      />
                    ) : (
                      <Text color="ink" className="font-semibold">
                        {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "-"}
                      </Text>
                    )}
                  </div>
                  <div>
                    <Text color="muted" size="sm">Gender</Text>
                    {isEditingProfile ? (
                      <select
                        value={profileForm.gender}
                        onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                        data-testid="profile-gender-select"
                        className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all
                          ${isDark
                            ? "bg-white/[0.05] border border-white/10 text-white focus:border-primary-400"
                            : "bg-white border border-ink-200 text-ink-900 focus:border-saffron-400 shadow-sm"
                          }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <Text color="ink" className="font-semibold">{profile?.gender || "-"}</Text>
                    )}
                  </div>
                </div>
              </div>
              {isEditingProfile && (
                <div className="flex gap-3 mt-6">
                  <Button onClick={onSaveProfile} variant="gradient" data-testid="profile-save-button">Save</Button>
                  <Button onClick={() => setIsEditingProfile(false)} variant="outline" data-testid="profile-cancel-button">Cancel</Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Addresses */}
      <Card variant="glass" hover={false} className="mb-8" data-testid="addresses-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Addresses</CardTitle>
            <Button variant="gradient" size="sm" onClick={() => setShowAddressForm(true)} data-testid="add-address-button">
              <Plus size={14} /> New Address
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {addresses?.map((addr) => (
              <div
                key={addr.id}
                data-testid={`address-item-${addr.id}`}
                className={`flex flex-col md:flex-row md:justify-between md:items-center p-4 rounded-xl ${addressItemClass}`}
              >
                <div className="mb-3 md:mb-0 flex items-start gap-3">
                  <MapPin size={18} className={`mt-1 shrink-0 ${isDark ? "text-primary-300" : "text-saffron-700"}`} />
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <Text color="ink" className="font-semibold">{addr.address_line_1}</Text>
                      {addr.is_default && <Badge variant="golden" size="sm">Default</Badge>}
                    </div>
                    <Text size="sm" color="muted">
                      {addr.address_line_2}, {addr.city}, {addr.state}, {addr.country}, {addr.postal_code}
                    </Text>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!addr.is_default && (
                    <Button variant="outline" size="sm" onClick={() => onSetDefault(addr.id)}>
                      <Star size={12} /> Set Default
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => onEditAddress(addr)}>
                    <Pencil size={12} /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:border-red-300" onClick={() => onDeleteAddress(addr.id)}>
                    <Trash2 size={12} /> Delete
                  </Button>
                </div>
              </div>
            ))}
            {(!addresses || addresses.length === 0) && (
              <Text className="text-center py-6" color="muted">No addresses saved yet.</Text>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Address Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 z-50" data-testid="address-modal">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setShowAddressForm(false); setEditAddress(null); }} />
          <div className="relative min-h-full flex items-center justify-center p-4 overflow-y-auto">
            <form
              onSubmit={editAddress ? onUpdateAddress : onAddAddress}
              className={`relative p-8 rounded-2xl w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto
                ${isDark
                  ? "bg-[#0f1a2e] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                  : "bg-white border border-saffron-200/60 shadow-sacred-lg"
                }`}
            >
              <Heading level={5} className="text-center">
                {editAddress ? "Edit Address" : "Add New Address"}
              </Heading>
              <Input name="address_line_1" placeholder="Address Line 1" value={addressForm.address_line_1} onChange={(e) => setAddressForm({ ...addressForm, address_line_1: e.target.value })} />
              <Input name="address_line_2" placeholder="Address Line 2" value={addressForm.address_line_2} onChange={(e) => setAddressForm({ ...addressForm, address_line_2: e.target.value })} />
              <Input name="city" placeholder="City" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} />
              <Input name="state" placeholder="State" value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} />
              <Input name="country" placeholder="Country" value={addressForm.country} onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })} />
              <Input name="postal_code" placeholder="Postal Code" value={addressForm.postal_code} onChange={(e) => setAddressForm({ ...addressForm, postal_code: e.target.value })} />
              <div className="flex gap-3 mt-4">
                <Button type="submit" variant="gradient" className="flex-1">{editAddress ? "Update" : "Add"}</Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowAddressForm(false);
                    setEditAddress(null);
                    setAddressForm({ address_line_1: "", address_line_2: "", city: "", state: "", country: "", postal_code: "" });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Orders */}
      <Card variant="glass" hover={false} className="mb-8" data-testid="orders-card">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className={`flex flex-col md:flex-row md:justify-between md:items-center p-4 rounded-xl ${addressItemClass}`}
              >
                <div className="mb-3 md:mb-0 flex items-start gap-3">
                  <PackageIcon size={18} className={`mt-1 shrink-0 ${isDark ? "text-primary-300" : "text-saffron-700"}`} />
                  <div>
                    <Text color="ink" className="font-semibold">Order #{order.id}</Text>
                    <Text size="sm" color="muted">{order.date}</Text>
                    <Text size="sm" className="mt-0.5">{order.items.join(", ")}</Text>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "success"
                        : order.status === "Shipped"
                        ? "primary"
                        : "warning"
                    }
                  >
                    {order.status}
                  </Badge>
                  <Text className={`font-bold ${isDark ? "text-amber-300" : "text-saffron-gradient"}`}>
                    {order.total}
                  </Text>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wishlist */}
      <Card variant="glass" hover={false} data-testid="wishlist-card">
        <CardHeader>
          <CardTitle>Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {mockWishlist.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl p-4 flex flex-col items-center transition-all duration-300 hover:-translate-y-1
                  ${isDark
                    ? "bg-white/[0.04] border border-white/10 hover:border-primary-400/40"
                    : "bg-white border border-ink-100 hover:border-saffron-300 shadow-sacred hover:shadow-sacred-md"
                  }`}
              >
                <div className={`w-full aspect-square mb-3 rounded-xl flex items-center justify-center overflow-hidden
                  ${isDark
                    ? "bg-gradient-to-br from-primary-500/10 to-purple-500/10"
                    : "bg-gradient-to-br from-ivory-100 via-saffron-50 to-gold-50"
                  }`}>
                  <Heart size={38} className={isDark ? "text-primary-300/60" : "text-saffron-400/70"} />
                </div>
                <Badge variant="primary" size="sm" className="mb-2">{item.badge}</Badge>
                <Text color="ink" className="font-semibold text-center mb-1 text-sm">{item.name}</Text>
                <Text className={`font-bold mb-3 ${isDark ? "text-amber-300" : "text-saffron-gradient"}`}>{item.price}</Text>
                <div className="flex gap-2 w-full">
                  <Button variant="gradient" size="sm" className="flex-1 !px-2 !text-xs">Add</Button>
                  <Button variant="outline" size="sm" className="!px-2"><Trash2 size={12} /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
