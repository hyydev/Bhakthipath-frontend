import { useState } from "react";
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

// Mock data for demonstration
const mockOrders = [
  {
    id: 1,
    date: "2023-10-01",
    status: "Delivered",
    total: "₹500",
    items: ["Tulsi Mala", "Bhagavad Gita"],
  },
  {
    id: 2,
    date: "2023-09-15",
    status: "Shipped",
    total: "₹300",
    items: ["Kurta Pajama"],
  },
  {
    id: 3,
    date: "2023-08-20",
    status: "Processing",
    total: "₹150",
    items: ["Japa Bag"],
  },
];

const mockWishlist = [
  {
    id: 1,
    name: "Tulsi Mala",
    price: "₹199",
    img: "/images/tulsi-mala.jpg",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Bhagavad Gita",
    price: "₹299",
    img: "/images/gita.jpg",
    badge: "Classic",
  },
  {
    id: 3,
    name: "Kurta Pajama",
    price: "₹799",
    img: "/images/kurta.jpg",
    badge: "New",
  },
  {
    id: 4,
    name: "Japa Bag",
    price: "₹149",
    img: "/images/japa-bag.jpg",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Meditation Cushion",
    price: "₹499",
    img: "/images/meditation-cushion.jpg",
    badge: "Trending",
  },
  {
    id: 6,
    name: "Incense Sticks",
    price: "₹99",
    img: "/images/incense-sticks.jpg",
    badge: "Essential",
  },
  {
    id: 7,
    name: "Yoga Mat",
    price: "₹699",
    img: "/images/yoga-mat.jpg",
    badge: "Top Rated",
  },
  {
    id: 8,
    name: "Spiritual Journal",
    price: "₹249",
    img: "/images/spiritual-journal.jpg",
    badge: "New Arrival",
  },
];

export default function ProfilePage() {
  const userId = useAuthStore((s) => s.userId);
  const {
    profile,
    isLoading: profileLoading,
    updateProfile,
  } = useProfile(userId);
  const {
    addresses,
    isLoading: addressesLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddresses();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    date_of_birth: "",
    gender: "",
  });

  const onEditProfileClick = () => {
    setProfileForm({
      date_of_birth: profile?.date_of_birth || "",
      gender: profile?.gender || "",
    });
    setIsEditingProfile(true);
  };
  const onSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ userId, data: profileForm });
    setIsEditingProfile(false);
  };

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
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
    setAddressForm({
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
    });
  };
  const onUpdateAddress = (e) => {
    e.preventDefault();
    updateAddress({ id: editAddress.id, data: addressForm });
    setShowAddressForm(false);
    setEditAddress(null);
  };

  const onDeleteAddress = (id) => {
    deleteAddress({ id });
  };

  const onSetDefault = (id) => {
    setDefaultAddress({ id });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Heading level={1} className="mb-8 text-center">
        My Profile
      </Heading>

      {/* Profile Header with Photo Upload */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Profile Information</CardTitle>
            {!isEditingProfile && (
              <Button variant="outline" size="sm" onClick={onEditProfileClick}>
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {profileLoading ? (
            <Text>Loading profile...</Text>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <img
                    src={
                      profile?.profile_picture || "/images/default-avatar.jpg"
                    }
                    alt="Profile"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-amber-300"
                  />
                  <label className="absolute bottom-0 right-0 bg-amber-500 text-white rounded-full p-2 cursor-pointer hover:bg-amber-600 transition">
                    <input type="file" className="hidden" accept="image/*" />
                    📷
                  </label>
                </div>

                {/* Profile Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 w-full">
                  <div>
                    <Text className="text-sm text-gray-500">Full Name</Text>
                    <Text className="font-semibold">
                      {profile?.user?.full_name || "-"}
                    </Text>
                  </div>

                  <div>
                    <Text className="text-sm text-gray-500">Email</Text>
                    <Text className="font-semibold">
                      {profile?.user?.email || "-"}
                    </Text>
                  </div>

                  <div>
                    <Text className="text-sm text-gray-500">Mobile Number</Text>
                    <Text className="font-semibold">
                      {profile?.user?.mobile_number || "-"}
                    </Text>
                  </div>

                  <div>
                    <Text className="text-sm text-gray-500">Date of Birth</Text>
                    {isEditingProfile ? (
                      <Input
                        type="date"
                        value={profileForm.date_of_birth}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            date_of_birth: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Text className="font-semibold">
                        {profile?.date_of_birth
                          ? new Date(profile.date_of_birth).toLocaleDateString(
                              "en-IN"
                            )
                          : "-"}
                      </Text>
                    )}
                  </div>

                  <div>
                    <Text className="text-sm text-gray-500">Gender</Text>
                    {isEditingProfile ? (
                      <select
                        value={profileForm.gender}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            gender: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <Text className="font-semibold">
                        {profile?.gender || "-"}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
              {isEditingProfile && (
                <div className="flex gap-4 mt-4 w-full">
                  <Button onClick={onSaveProfile} variant="gradient">
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditingProfile(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Address Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {addresses?.map((addr) => (
              <div
                key={addr.id}
                className="flex flex-col md:flex-row md:justify-between md:items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="mb-2 md:mb-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Text className="font-semibold">{addr.address_line_1}</Text>
                    {addr.is_default && <Badge variant="golden">Default</Badge>}
                  </div>
                  <Text className="text-sm text-gray-600 dark:text-gray-300">
                    {addr.address_line_2}, {addr.city}, {addr.state},{" "}
                    {addr.country}, {addr.postal_code}
                  </Text>
                </div>
                <div className="flex space-x-2">
                  {!addr.is_default && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSetDefault(addr.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditAddress(addr)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDeleteAddress(addr.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="gradient"
            className="mt-4"
            onClick={() => setShowAddressForm(true)}
          >
            Add New Address
          </Button>
        </CardContent>
      </Card>

      {/* Address Add/Edit Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={editAddress ? onUpdateAddress : onAddAddress}
            className="bg-white dark:bg-[#0A1628] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
          >
            <Heading level={3} className="mb-2 text-center">
              {editAddress ? "Edit Address" : "Add New Address"}
            </Heading>
            <Input
              name="address_line_1"
              placeholder="Address Line 1"
              value={addressForm.address_line_1}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  address_line_1: e.target.value,
                })
              }
            />
            <Input
              name="address_line_2"
              placeholder="Address Line 2"
              value={addressForm.address_line_2}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  address_line_2: e.target.value,
                })
              }
            />
            <Input
              name="city"
              placeholder="City"
              value={addressForm.city}
              onChange={(e) =>
                setAddressForm({ ...addressForm, city: e.target.value })
              }
            />
            <Input
              name="state"
              placeholder="State"
              value={addressForm.state}
              onChange={(e) =>
                setAddressForm({ ...addressForm, state: e.target.value })
              }
            />
            <Input
              name="country"
              placeholder="Country"
              value={addressForm.country}
              onChange={(e) =>
                setAddressForm({ ...addressForm, country: e.target.value })
              }
            />
            <Input
              name="postal_code"
              placeholder="Postal Code"
              value={addressForm.postal_code}
              onChange={(e) =>
                setAddressForm({ ...addressForm, postal_code: e.target.value })
              }
            />
            <div className="flex gap-4 mt-4">
              <Button type="submit" variant="gradient" className="flex-1">
                {editAddress ? "Update" : "Add"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowAddressForm(false);
                  setEditAddress(null);
                  setAddressForm({
                    address_line_1: "",
                    address_line_2: "",
                    city: "",
                    state: "",
                    country: "",
                    postal_code: "",
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Order History */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row md:justify-between md:items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="mb-2 md:mb-0">
                  <Text className="font-semibold">Order #{order.id}</Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-300">
                    {order.date}
                  </Text>
                  <Text className="text-sm">{order.items.join(", ")}</Text>
                </div>
                <div className="flex flex-col md:items-end space-y-1">
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
                  <Text className="font-semibold text-amber-500">
                    {order.total}
                  </Text>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wishlist */}
      <Card>
        <CardHeader>
          <CardTitle>Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockWishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 dark:bg-[#0A1628]/80 rounded-2xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 object-contain mb-3 rounded-lg"
                />
                <Badge variant="primary" size="sm" className="mb-2">
                  {item.badge}
                </Badge>
                <Text className="font-semibold text-center mb-1">
                  {item.name}
                </Text>
                <Text className="text-amber-500 font-bold mb-3">
                  {item.price}
                </Text>
                <div className="flex space-x-2 w-full">
                  <Button variant="gradient" size="sm" className="flex-1">
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
