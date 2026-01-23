using System;

namespace TaskManager.Infrastructure.Data
{
    public class RefreshTokenStore
    {
        private static readonly Dictionary<string, (Guid UserId, DateTime Expiry)> _store = new();

        public static void Save(string token, Guid userId, DateTime expiry)
        {
            _store[token] = (userId, expiry);
        }

        public static (Guid UserId, bool IsValid) Validate(string token)
        {
            if (_store.TryGetValue(token, out var entry))
            {
                if (DateTime.UtcNow < entry.Expiry)
                    return (entry.UserId, true);
                _store.Remove(token);
            }
            return (Guid.Empty, false);
        }

        public static void Revoke(string token)
        {
            _store.Remove(token);
        }
    }
}