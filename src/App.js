import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import CountryDetailsPage from "./pages/hero/CountryDetailsPage";
import FlightSearchPage from "./pages/hero/FlightSearchPage";
import HeroPage from "./pages/hero/HeroPage";
import HotelPage from "./pages/hero/HotelPage";
import PackageDetailsPage from "./pages/hero/PackageDetailsPage";
import PlaceDetailsPage from "./pages/hero/PlaceDetailsPage";
import RoomDetailsPage from "./pages/hero/RoomDetailsPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ProfilePage from "./pages/auth/ProfilePage";
import { UserProvider } from "./components/UserContext";
import HotelPaymentPage from "./components/HotelPaymentPage";
import PackagePaymentPage from "./components/PackagePaymentPage";
import FlightPaymentPage from "./components/FlightPaymentPage";
import VerificationSuccess from "./pages/auth/VerificationSuccess";
import EditUserDetailsPage from "./pages/auth/EditUserDetailsPage";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import AddPhoneNumberPage from "./pages/auth/AddPhoneNumberPage";
import CountriesListPage from "./admin/country/CountriesListPage";
import AddCountryPage from "./admin/country/AddCountryPage";
import EditCountryPage from "./admin/country/EditCountryPage";
import Dashboard from "./admin/Dashboard";
import EditCountryDetailsPage from "./admin/country/details/EditCountryDetailsPage";
import GetCountryDetailsPage from "./admin/country/details/GetCountryDetailsPage";
import AddPlacePage from "./admin/country/place/AddPlacePage";
import GetPlacesPage from "./admin/country/place/GetPlacesPage";
import GetPlaceDetailsPage from "./admin/country/place/details/GetPlaceDetailsPage";
import EditPlacePage from "./admin/country/place/EditPlacePage";
import EditPlaceDetailsPage from "./admin/country/place/details/EditPlaceDetailsPage";
import GetPackageDetailsPage from "./admin/country/package/details/GetPackageDetailsPage";
import CreatePackagePage from "./admin/country/package/CreatePackagePage";
import EditPackagePage from "./admin/country/package/EditPackagePage";
import DeletePackagePage from "./admin/country/package/DeletePackagePage";
import GetPackagesPage from "./admin/country/package/GetPackagePage";
import EditPackageDetailsPage from "./admin/country/package/details/EditPackageDetailsPage";
import CreateRoadmapPage from "./admin/country/package/roadmap/CreateRoadmapPage";
import EditRoadmapPage from "./admin/country/package/roadmap/EditRoadmapPage";
import GetRoadmapsPage from "./admin/country/package/roadmap/GetRoadmapPage";
import CreateBenefitPage from "./admin/country/package/benefit/CreateBenefitPage";
import GetBenefitsPage from "./admin/country/package/benefit/GetBenefitPage";
import EditBenefitPage from "./admin/country/package/benefit/EditBenefitPage";
import ManagePackageRoadmapsPage from "./admin/country/package/manageRelations/ManagePackageRoadmapsPage";
import ManagePackageBenefitsPage from "./admin/country/package/manageRelations/ManagePackageBenefitsPage";
import GetAirportsPage from "./admin/country/place/airports/GetAirportsPage";
import CreateAirportPage from "./admin/country/place/airports/CreateAirportPage";
import EditAirportPage from "./admin/country/place/airports/EditAirportPage";
import CreatePlanePage from "./admin/plane/CreatePlanePage";
import EditPlanePage from "./admin/plane/EditPlanePage";
import AddFlightPage from "./admin/plane/flight/AddFlightPage";
import GetFlightsPage from "./admin/plane/flight/GetFlightsPage";
import GetHotelsPage from "./admin/country/place/hotel/GetHotelsPage";
import CreateHotelPage from "./admin/country/place/hotel/CreateHotelPage";
import EditHotelPage from "./admin/country/place/hotel/EditHotelPage";
import GetRoomDetailsPage from "./admin/country/place/hotel/details/GetRoomDetails";
import EditRoomDetailsPage from "./admin/country/place/hotel/details/EditRoomDetails";
import GetHotelFeaturesPage from "./admin/country/place/hotel/hotelFeatures/GetHotelFeature";
import CreateHotelFeaturePage from "./admin/country/place/hotel/hotelFeatures/CreateHotelFeature";
import EditHotelFeaturePage from "./admin/country/place/hotel/hotelFeatures/EditHotelFeature";
import GetRoomFeaturesPage from "./admin/country/place/hotel/roomFeatures/GetRoomFeaturePage";
import NotAuthorized from "./components/NotAuthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageHotelFeaturesPage from "./admin/country/place/hotel/manageRelations/ManageHotelFeaturePage";
import ManageRoomFeaturesPage from "./admin/country/place/hotel/manageRelations/ManageRoomFeaturePage";
import CreateRoomFeaturePage from "./admin/country/place/hotel/roomFeatures/CreateRoomFeaturePage";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/verification/:email/:token"
            element={<VerificationSuccess />}
          />
          <Route
            path="/edit-user-details/:userId"
            element={<EditUserDetailsPage />}
          />
          <Route path="/add-phone-number" element={<AddPhoneNumberPage />} />

          <Route path="/" element={<HeroPage />} />
          <Route path="/country/details/:id" element={<CountryDetailsPage />} />
          <Route path="/place/details/:id" element={<PlaceDetailsPage />} />
          <Route path="/package/details/:id" element={<PackageDetailsPage />} />

          <Route path="/hotels/:id" element={<HotelPage />} />
          <Route path="/room/details/:id" element={<RoomDetailsPage />} />

          <Route path="/flights/:id" element={<FlightSearchPage />} />

          <Route
            path="/payment/hotels/:hotelId/users/:userId"
            element={<HotelPaymentPage />}
          />

          <Route
            path="/payment/packages/:packageId/users/:userId"
            element={<PackagePaymentPage />}
          />

          <Route
            path="/payment/flights/:flightId/users/:userId"
            element={<FlightPaymentPage />}
          />

          <Route path="/payment-success" element={<PaymentSuccessPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries"
            element={
              <ProtectedRoute>
                <CountriesListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/country"
            element={
              <ProtectedRoute>
                <AddCountryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId"
            element={
              <ProtectedRoute>
                <EditCountryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/details"
            element={
              <ProtectedRoute>
                <GetCountryDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/details/edit"
            element={
              <ProtectedRoute>
                <EditCountryDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/place"
            element={
              <ProtectedRoute>
                <AddPlacePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places"
            element={
              <ProtectedRoute>
                <GetPlacesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/edit"
            element={
              <ProtectedRoute>
                <EditPlacePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/details"
            element={
              <ProtectedRoute>
                <GetPlaceDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/details/edit"
            element={
              <ProtectedRoute>
                <EditPlaceDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages"
            element={
              <ProtectedRoute>
                <GetPackagesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/package"
            element={
              <ProtectedRoute>
                <CreatePackagePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/:packageId/edit"
            element={
              <ProtectedRoute>
                <EditPackagePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/:packageId/delete"
            element={
              <ProtectedRoute>
                <DeletePackagePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/:packageId/details"
            element={
              <ProtectedRoute>
                <GetPackageDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/:packageId/details/edit"
            element={
              <ProtectedRoute>
                <EditPackageDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/roadmap"
            element={
              <ProtectedRoute>
                <CreateRoadmapPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/roadmaps"
            element={
              <ProtectedRoute>
                <GetRoadmapsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/roadmaps/:roadmapId/edit"
            element={
              <ProtectedRoute>
                <EditRoadmapPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/benefit"
            element={
              <ProtectedRoute>
                <CreateBenefitPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/benefits"
            element={
              <ProtectedRoute>
                <GetBenefitsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/benefits/:benefitId/edit"
            element={
              <ProtectedRoute>
                <EditBenefitPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/:packageId/benefits"
            element={
              <ProtectedRoute>
                <ManagePackageBenefitsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/packages/:packageId/roadmaps"
            element={
              <ProtectedRoute>
                <ManagePackageRoadmapsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/airports"
            element={
              <ProtectedRoute>
                <GetAirportsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/airport"
            element={
              <ProtectedRoute>
                <CreateAirportPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/airports/:airPortId/edit"
            element={
              <ProtectedRoute>
                <EditAirportPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/plane"
            element={
              <ProtectedRoute>
                <CreatePlanePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/planes/:planeId"
            element={
              <ProtectedRoute>
                <EditPlanePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/planes/:planeId/flight/add"
            element={
              <ProtectedRoute>
                <AddFlightPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/flights"
            element={
              <ProtectedRoute>
                <GetFlightsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/hotels"
            element={
              <ProtectedRoute>
                <GetHotelsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/hotels/create"
            element={
              <ProtectedRoute>
                <CreateHotelPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/hotels/:hotelId/edit"
            element={
              <ProtectedRoute>
                <EditHotelPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/hotels/:hotelId/details"
            element={
              <ProtectedRoute>
                <GetRoomDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/hotels/:hotelId/rooms/details/edit"
            element={
              <ProtectedRoute>
                <EditRoomDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/hotels/features"
            element={
              <ProtectedRoute>
                <GetHotelFeaturesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/hotels/features/create"
            element={
              <ProtectedRoute>
                <CreateHotelFeaturePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/hotels/features/:featureId/edit"
            element={
              <ProtectedRoute>
                <EditHotelFeaturePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/rooms/features"
            element={
              <ProtectedRoute>
                <GetRoomFeaturesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/rooms/features/create"
            element={
              <ProtectedRoute>
                <CreateRoomFeaturePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/rooms/features/:featureId/edit"
            element={
              <ProtectedRoute>
                <EditHotelFeaturePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/hotels/:hotelId"
            element={
              <ProtectedRoute>
                <ManageHotelFeaturesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/countries/:countryId/places/:placeId/hotels/:hotelId"
            element={
              <ProtectedRoute>
                <ManageRoomFeaturesPage />
              </ProtectedRoute>
            }
          />

          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
